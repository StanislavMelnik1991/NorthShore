export interface SecuritySipAccount {
  id: number;
  phone: number;
  status: number;
  username: string;
  password: string;
  sip_server: SecuritySipServer;
  intercom_id: number;
  apartment_id: number | null;
  sip_server_id: SecuritySipServer['id'];
}
export interface SecuritySipServer {
  id: number;
  name: string;
  sip_url: string;
  ip_address: string;
  description: string;
  websocket_url: string;
  port: string;
}
