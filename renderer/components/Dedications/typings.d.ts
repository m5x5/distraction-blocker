export type Dedication = {
  id: string;
  name: string;
  hours: number;
  index: number;
  quantity: number;
  tracker?: string;
};

export type DraftDedication = {
  name: string;
  hours: number;
  tracker?: string;
  quantity?: number;
};

export interface Context {
  dedications: Dedication[];
  HOURS_IN_WEEK: 168;
  showAddModal: boolean;
  showEditModal: boolean;
}

export interface ContextProps extends Context {
  setDedications: (dedications: Dedication[]) => void;
  createDedication: (draftDedication: DraftDedication) => Promise<Dedication>;
  editDedication: (
    id: string,
    draftDedication: DraftDedication
  ) => Promise<Dedication>;
  setShowAddModal: (showAddModal: boolean) => void;
  setShowEditModal: (showEditModal: boolean) => void;
  timeLeft: number;
}

export type Fetcher = (url: RequestInfo) => Promise<Dedication[]>;
