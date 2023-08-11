export type SysInfo = {
  OS: string;
  CPU: {
    Model: string;
    Cores: number;
    Threads: number;
    Speed: number;
  };
  Memory: {
    Total: number;
    Speed: number;
    TotalSlots: number;
    UsedSlots: number;
    DDR: string;
  };
  Disk: Disk[];
};

type DriveInfo = {
  DeviceID: string;
  Caption: string;
  Size: number;
  Model: string;
};

type Disk = {
  Info: DriveInfo;
  Name: string;
  Model: string;
  Size: number;
  Used: number;
};
