import { Host, Connector } from "@espruino-tools/peer";

let q = new Connector();
q.connectData();
q.conn.send("my chosen data");

let p = new Host("optional param for other device domain");
p.getData(function (data: any) {
  switch (data) {
    case "forward":
      // call forward function
      break;
    case "something else":
      // call something else function
      break;
    default:
      // log data or create a default function
      break;
  }
});