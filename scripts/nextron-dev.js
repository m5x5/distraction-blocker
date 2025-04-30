const arg = require("arg");
const delay = require("delay");
const execa = require("execa");
const configure = require("../webpack.config");
const { merge } = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
const log = require("../logger");
const pidtree = require("pidtree");

const args = arg({
  "--help": Boolean,
  "--version": Boolean,
  "--port": Number,
  "--remote-debugging-port": Number,
  "--inspect": Number,
  "--run-only": Boolean,
  "-v": "--version",
  "-p": "--port",
  "-r": "--run-only",
});

const rendererPort = args["--port"] || 8888;

const execaOptions = {
  cwd: process.cwd(),
  stdio: "inherit",
  windowsHide: false,
  env: { FORCE_COLOR: true },
};

async function killTree(pid) {
  const pids = await pidtree(pid);
  for (const pid of pids) {
    try {
      process.kill(pid, "SIGKILL");
    } catch (e) {
      // ignore
    }
  }
}

async function dev() {
  let watching;
  let mainProcess;
  let rendererProcess;
	console.log('dev')

  const startMainProcess = () => {
	  console.log("Main")
    log("Starting main process...");
    mainProcess = execa(
      "electron",
      [
        ".",
        `${rendererPort}`,
        // `--remote-debugging-port=${remoteDebuggingPort}`,
        // `--inspect=${inspectPort}`,
      ],
      {
        detached: false,
        ...execaOptions,
      }
    );
    mainProcess.unref();
  };

  const startRendererProcess = () => {
    const child = execa(
      "npx next",
      ["-p", rendererPort, "renderer"],
      execaOptions
    );
    child.on("close", () => {
      process.exit(0);
    });
    return child;
  };

  const killWholeProcess = () => {
    if (watching) {
      watching.close(() => {});
    }
    if (mainProcess) {
      mainProcess.kill();
      mainProcess = null;
    }
    if (rendererProcess) {
      rendererProcess.kill();
      rendererProcess = null;
    }
  };

  const webpackCallback = async (err) => {
    if (err) {
      console.error(err.stack || err);
    }

    if (!err) {
      if (mainProcess) {
        log("Killing main process");
        killTree(mainProcess.pid);
        mainProcess.kill();
      }
      startMainProcess();
    }
  };

  process.on("SIGINT", killWholeProcess);
  process.on("SIGTERM", killWholeProcess);
  process.on("exit", killWholeProcess);

	await  webpackCallback();
  rendererProcess = startRendererProcess();
	console.log("Heyyy")

  // wait until renderer process is ready
  //await delay(8000);
	console.log('Delay')

  // Write a keep alive script
  const keepAlive = () => {
    if (rendererProcess) {
      rendererProcess.kill("SIGUSR1");
    }
  }

  setInterval(keepAlive, 1000 * 60 * 5);
// 	try  {
// webpack(
//     merge(configure("development"), {
//       entry: path.join(process.cwd(), "main", `background.ts`),
//     })
//   );
//
// 	}catch (err) {
// console.log('Err:', err)
// }
//   const compiler = webpack(
//     merge(configure("development"), {
//       entry: path.join(process.cwd(), "main", `background.ts`),
//     })
//   );
// 	console.log("Heyyyy")
//   if (args["--run-only"]) {
//     compiler.run(webpackCallback);
// 	console.log("Heyyy 1")
//   } else {
//     watching = compiler.watch({}, webpackCallback);
// 	console.log("Heyyy 2")
//   }
}

dev();
