export enum ProgressType {
	Drop		 = 'dropFiles',
	Import		 = 'import',
	Export		 = 'export',
	Save		 = 'saveFile',
	Migrate		 = 'migration',
	Recover		 = 'recoverAccount',
	Update		 = 'update',
	UpdateCheck	 = 'updateCheck',
};

export enum ProgressState {
	None		 = 0,
	Running		 = 1,
	Done		 = 2,
	Canceled	 = 3,
	Error		 = 4,
};

export interface Progress {
	id?: string;
	type?: ProgressType;
	current?: number;
	total?: number;
	state?: ProgressState;
	canCancel?: boolean;
};