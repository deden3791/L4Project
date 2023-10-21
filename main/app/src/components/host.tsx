import { Host, Connector } from "@espruino-tools/peer";

let host = new Host();

  host.getData(function (data: any) {
    console.log(data);
  });

