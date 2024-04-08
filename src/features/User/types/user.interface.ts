export interface IUser {
  id: number;
  name: string;
  email: string;
  group: {
    id: number;
    name: string;
  };
  avatar: string;
  phone_number: string;
  sip_accounts: {
    id: number;
    phone: number;
    status: number;
    password: string;
    username: string;
    sip_server: {
      id: number;
      name: string;
      sip_url: string;
      ip_address: string;
      description: string;
      websocket_url: string;
    };
    sip_server_id: number;
  };
  accept_intercom: number;
  account_numbers: Array<{
    id: number;
    account: string;
    user_id: number;
  }>;
}
