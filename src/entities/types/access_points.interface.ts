import {
  SecurityAccess,
  SecurityCamera,
  SecurityIntercom,
  SecuritySlsIntercom,
} from './security.interface';

export interface IAccessPoint {
  access_points: Record<string, Array<SecurityAccess>>;
  cameras: Array<SecurityCamera>;
  intercoms: Array<SecurityIntercom>;
  sls_intercoms: Array<SecuritySlsIntercom>;
  additional_access_points: Record<
    string,
    Array<SecurityAccess & { connect_id: number }>
  >;
  additional_cameras: Array<SecurityCamera & { connect_id: number }>;
  additional_intercoms: Array<SecurityIntercom & { connect_id: number }>;
}
