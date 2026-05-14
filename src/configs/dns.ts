import dns from "dns";

export default function setupDNS() {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}
