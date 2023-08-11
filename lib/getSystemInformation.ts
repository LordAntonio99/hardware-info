import { cpus } from "os";
import si from "systeminformation";

export async function getHardwareInfo() {
  try {
    let hw = { cpu: {} };
    const cpu = (async () => {
      const data = await si.cpu();
      return data;
    })();
    console.log(cpu);
    hw.cpu = cpu;
    return hw;
  } catch (error) {
    console.log(error);
  }
}
