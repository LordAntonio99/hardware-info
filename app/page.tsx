"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { CPU_FAMILY } from "@/lib/CPU_FAMILY";
import * as si from "systeminformation";
import { cn } from "@/lib/utils";

const API_CALLS = [
  {
    api_route: "/api/cpu",
    object_key: "CPU_DATA",
  },
  {
    api_route: "/api/motherboard",
    object_key: "MOTHERBOARD_DATA",
  },
  {
    api_route: "/api/bios",
    object_key: "BIOS_DATA",
  },
  {
    api_route: "/api/gpu",
    object_key: "GPU_DATA",
  },
];

const MainPage = () => {
  const [loading, setLoading] = useState({
    state: true,
    progress: 0,
  });
  const [systemInformation, setSystemInformation] = useState({
    CPU_DATA: {} as si.Systeminformation.CpuData,
    MOTHERBOARD_DATA: {} as si.Systeminformation.BaseboardData,
    BIOS_DATA: {} as si.Systeminformation.BiosData,
    GPU_DATA: {} as si.Systeminformation.GraphicsData,
  } as any);

  async function fetchApiCall(api_route: string, object_key: string) {
    try {
      const response = await axios.get(api_route);
      const data: any = response.data;
      setSystemInformation((prevState: any) => ({
        ...prevState,
        [object_key]: data,
      }));
    } catch (error) {
      console.error(`Error fetching ${object_key} data:`, error);
    }
  }

  async function fetchAllData() {
    const progress_steps = 100 / API_CALLS.length;
    for (const api_call of API_CALLS) {
      await fetchApiCall(api_call.api_route, api_call.object_key);
      setLoading((prevState) => ({
        ...prevState,
        progress: prevState.progress + progress_steps,
      }));
    }
    setLoading((prevState) => ({
      ...prevState,
      state: false,
    }));
    return;
  }

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-8 p-8 place-content-center">
      {loading.state ? (
        <>
          <div className="col-span-2">
            <h1 className="text-center text-4xl font-bold mb-24">
              Hardware Info
            </h1>
            <Progress value={loading.progress} />
          </div>
        </>
      ) : (
        <>
          <Card className="row-span-2">
            <CardHeader>
              <CardTitle>CPU</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Manufacturer</TableCell>
                    <TableCell>
                      {systemInformation.CPU_DATA?.manufacturer}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Brand</TableCell>
                    <TableCell>{systemInformation.CPU_DATA?.brand}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Authenticity</TableCell>
                    <TableCell>{systemInformation.CPU_DATA?.vendor}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Family</TableCell>
                    <TableCell>{systemInformation.CPU_DATA?.family}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Model</TableCell>
                    <TableCell>{systemInformation.CPU_DATA?.model}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Stepping</TableCell>
                    <TableCell>
                      {systemInformation.CPU_DATA?.stepping}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Revision</TableCell>
                    <TableCell>
                      {systemInformation.CPU_DATA?.revision}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Physical Cores</TableCell>
                    <TableCell>
                      {systemInformation.CPU_DATA?.physicalCores}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Logical Cores</TableCell>
                    <TableCell>{systemInformation.CPU_DATA?.cores}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Socket</TableCell>
                    <TableCell>{systemInformation.CPU_DATA?.socket}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Virtualization Enabled</TableCell>
                    <TableCell>
                      {systemInformation.CPU_DATA?.virtualization
                        ? "Yes"
                        : "No"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Motherboard</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Manufacturer</TableCell>
                    <TableCell>
                      {systemInformation.MOTHERBOARD_DATA?.manufacturer}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Model</TableCell>
                    <TableCell>
                      {systemInformation.MOTHERBOARD_DATA?.model}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Version</TableCell>
                    <TableCell>
                      {systemInformation.MOTHERBOARD_DATA?.version}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Serial</TableCell>
                    <TableCell>
                      {systemInformation.MOTHERBOARD_DATA?.serial}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Memory Slots</TableCell>
                    <TableCell>
                      {systemInformation.MOTHERBOARD_DATA?.memSlots}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>BIOS</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Vendor</TableCell>
                    <TableCell>{systemInformation.BIOS_DATA?.vendor}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Version</TableCell>
                    <TableCell>
                      {systemInformation.BIOS_DATA?.version}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Release Date</TableCell>
                    <TableCell>
                      {systemInformation.BIOS_DATA?.releaseDate}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Revision</TableCell>
                    <TableCell>
                      {systemInformation.BIOS_DATA?.revision}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>GPU</CardTitle>
            </CardHeader>
            <CardContent>
              {systemInformation?.GPU_DATA?.controllers?.map(
                (controller: any, i: number) => (
                  <Table key={i}>
                    <TableHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell colSpan={2}>GPU # {i + 1}</TableCell>
                        </TableRow>
                      </TableHead>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Vendor</TableCell>
                        <TableCell>{controller.vendor}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Model</TableCell>
                        <TableCell>{controller.model}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Bus</TableCell>
                        <TableCell>{controller.bus}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>VRAM</TableCell>
                        <TableCell>
                          {Math.round(parseInt(controller.vram) / 1024)} Gb
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                )
              )}
            </CardContent>
          </Card>
          <Card className="row-span-2">
            <CardHeader>
              <CardTitle>Displays</CardTitle>
            </CardHeader>
            <CardContent>
              {systemInformation.GPU_DATA?.displays?.map(
                (display: any, i: number) => (
                  <Table key={i}>
                    <TableHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell colSpan={2}>Display # {i + 1}</TableCell>
                        </TableRow>
                      </TableHead>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Vendor</TableCell>
                        <TableCell>{display.vendor}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Model</TableCell>
                        <TableCell>{display.model}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Device Name</TableCell>
                        <TableCell>{display.deviceName}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Main Monitor</TableCell>
                        <TableCell>{display.main ? "Yes" : "No"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Built In</TableCell>
                        <TableCell>{display.builtIn ? "Yes" : "No"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Connection</TableCell>
                        <TableCell>{display.connection}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Resolution</TableCell>
                        <TableCell>
                          {display.resolutionX} x {display.resolutionY}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Pixel Depth</TableCell>
                        <TableCell>{display.pixelDepth}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Size</TableCell>
                        <TableCell>
                          {display.sizeX} x {display.sizeY}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Current Refresh Rate</TableCell>
                        <TableCell>{display.currentRefreshRate} Hz</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                )
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default MainPage;
