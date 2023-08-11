import os from "os";
import { version, platform, type } from "@tauri-apps/api/os";
import { Command } from "@tauri-apps/api/shell";
import { SysInfo } from "@/types/SysInfo";
import * as sysinfo from "systeminformation";

export default async function getSysInfo() {
  let fullSysInfo: SysInfo = {} as SysInfo;
  // Check the current OS
  const sysType = await type();
  switch (sysType) {
    case "Windows_NT":
      const cpuModel = await getCpuModelWindows();
      const cpuCores = await getCpuTotalCoresWindows();
      const cpuThreads = await getCpuTotalThreadsWindows();
      const cpuSpeed = await getCpuSpeedWindows();
      const memoryTotal = await getMemoryTotalWindows();
      const memorySpeed = await getMemorySpeedWindows();
      const memoryTotalSlots = await getMemoryTotalSlotsWindows();
      const memoryUsedSlots = await getMemoryUsedSlotsWindows();
      const memoryDDR = await getMemoryDDRWindows();
      const disks = await getDiskListWindows();
      fullSysInfo = {
        OS: "Windows",
        CPU: {
          Model: cpuModel as string,
          Cores: parseInt(cpuCores as string),
          Threads: parseInt(cpuThreads as string),
          Speed: parseFloat(cpuSpeed as string),
        },
        Memory: {
          Total: parseFloat(memoryTotal as string),
          Speed: parseFloat(memorySpeed as string),
          TotalSlots: parseInt(memoryTotalSlots as string),
          UsedSlots: parseInt(memoryUsedSlots as string),
          DDR: memoryDDR as string,
        },
        Disk: [
          {
            Info: JSON.parse(disks as string),
            Name: "",
            Model: "",
            Size: 0,
            Used: 0,
          },
        ],
      };
      break;
    case "Linux":
      fullSysInfo = { ...fullSysInfo, OS: "Linux" };
      break;
    case "Darwin":
      fullSysInfo = { ...fullSysInfo, OS: "MacOS" };
      break;
    default:
      fullSysInfo = { ...fullSysInfo, OS: "Unknown" };
      break;
  }

  return fullSysInfo;
}

const getCpuModelWindows = () => {
  return new Promise((resolve, reject) => {
    const command = new Command("Get-CPU-Model-Windows");
    let data = "";

    command.stdout.on("data", (chunk) => {
      data += chunk.toString();
      data = data.trim().replace(/\s+/g, " ");
    });

    command.on("close", (code) => {
      if (code.code === 0) {
        resolve(data);
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    command.spawn();
  });
};

const getCpuTotalCoresWindows = () => {
  return new Promise((resolve, reject) => {
    const command = new Command("Get-CPU-TotalCores-Windows");
    let data = "";

    command.stdout.on("data", (chunk) => {
      data += chunk.toString();
      data = data.trim().replace(/\s+/g, " ");
    });

    command.on("close", (code) => {
      if (code.code === 0) {
        resolve(data);
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    command.spawn();
  });
};

const getCpuTotalThreadsWindows = () => {
  return new Promise((resolve, reject) => {
    const command = new Command("Get-CPU-TotalThreads-Windows");
    let data = "";

    command.stdout.on("data", (chunk) => {
      data += chunk.toString();
      data = data.trim().replace(/\s+/g, " ");
    });

    command.on("close", (code) => {
      if (code.code === 0) {
        resolve(data);
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    command.spawn();
  });
};

const getMemoryTotalWindows = () => {
  return new Promise((resolve, reject) => {
    const command = new Command("Get-Memory-Total-Windows");
    let data = "";

    command.stdout.on("data", (chunk) => {
      data += chunk.toString();
      data = data.trim().replace(/\s+/g, " ");
      // Convert the data from bytes to gigabytes
      data = (parseInt(data) / 1024 / 1024 / 1024).toFixed(2);
    });

    command.on("close", (code) => {
      if (code.code === 0) {
        resolve(data);
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    command.spawn();
  });
};

const getCpuSpeedWindows = () => {
  return new Promise((resolve, reject) => {
    const command = new Command("Get-CPU-Speed-Windows");
    let data = "";

    command.stdout.on("data", (chunk) => {
      data += chunk.toString();
      data = data.trim().replace(/\s+/g, " ");
      // Convert the data from megahertz to gigahertz
      data = (parseInt(data) / 1000).toFixed(2);
    });

    command.on("close", (code) => {
      if (code.code === 0) {
        resolve(data);
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    command.spawn();
  });
};

const getMemorySpeedWindows = () => {
  return new Promise((resolve, reject) => {
    const command = new Command("Get-Memory-Speed-Windows");
    let data = "";

    command.stdout.on("data", (chunk) => {
      data += chunk.toString();
    });

    command.on("close", (code) => {
      if (code.code === 0) {
        resolve(data);
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    command.spawn();
  });
};

const getMemoryTotalSlotsWindows = () => {
  return new Promise((resolve, reject) => {
    const command = new Command("Get-Memory-TotalSlots-Windows");
    let data = "";

    command.stdout.on("data", (chunk) => {
      data += chunk.toString();
      data = data.trim().replace(/\s+/g, " ");
    });

    command.on("close", (code) => {
      if (code.code === 0) {
        resolve(data);
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    command.spawn();
  });
};

const getMemoryUsedSlotsWindows = () => {
  return new Promise((resolve, reject) => {
    const command = new Command("Get-Memory-UsedSlots-Windows");
    let data = "";

    command.stdout.on("data", (chunk) => {
      data += chunk.toString();
      console.log(data);
    });

    command.stderr.on("data", (chunk) => {
      data += chunk.toString();
      console.log(data);
    });

    command.on("close", (code) => {
      if (code.code === 0) {
        resolve(data);
      } else {
        console.log(code);
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    command.spawn();
    console.log(data);
  });
};

const getMemoryDDRWindows = () => {
  return new Promise((resolve, reject) => {
    const command = new Command("Get-Memory-DDR-Windows");
    let data = "";

    command.stdout.on("data", (chunk) => {
      data += chunk.toString();
      data = data.trim().replace(/\s+/g, " ");
      switch (data) {
        case "20":
          data = "DDR";
          break;
        case "21":
          data = "DDR2";
          break;
        case "24":
          data = "DDR3";
          break;
        case "26":
          data = "DDR4";
          break;
        default:
          data = "Unknown";
      }
    });

    command.stderr.on("data", (chunk) => {
      data += chunk.toString();
      console.log(data);
    });

    command.on("close", (code) => {
      if (code.code === 0) {
        resolve(data);
      } else {
        console.log(code);
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    command.spawn();
  });
};

const getDiskListWindows = () => {
  return new Promise((resolve, reject) => {
    const command = new Command("Get-Disks-List-Windows", "", {
      encoding: "utf-8",
    });
    let data = "";

    command.stdout.on("data", (chunk) => {
      data += chunk.toString();
    });

    command.stderr.on("data", (chunk) => {
      data += chunk.toString();
      console.log(data);
    });

    command.on("close", (code) => {
      if (code.code === 0) {
        const finalData = data;
        resolve(finalData);
      } else {
        console.log(code);
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    command.spawn();
  });
};

export async function getHardwareInfo() {
  try {
    let hw = { cpu: {} };
    const cpu = (async () => {
      const data = await sysinfo.cpu();
      return data;
    })();
    console.log(cpu);
    hw.cpu = cpu;
    return hw;
  } catch (error) {
    console.log(error);
  }
}
