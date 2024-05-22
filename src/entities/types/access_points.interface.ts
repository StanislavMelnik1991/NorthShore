import {
  SecurityAccess,
  SecurityCamera,
  SecurityIntercom,
  SecuritySlsIntercom,
} from './security.interface';

export interface IAccessPoint {
  access_points: {
    Велобокс: SecurityAccess[];
    Ворота: SecurityAccess[];
    Калитка: SecurityAccess[];
    Колясочная: SecurityAccess[];
    Лапомойка: SecurityAccess[];
    'Откатные ворота': SecurityAccess[];
    Подвал: SecurityAccess[];
    Шлагбаум: SecurityAccess[];
    Этаж: SecurityAccess[];
  };
  cameras: SecurityCamera[];
  intercoms: SecurityIntercom[];
  sls_intercoms: SecuritySlsIntercom[];
  additional_access_points: {
    Велобокс: SecurityAccess[];
    Ворота: SecurityAccess[];
    Калитка: SecurityAccess[];
    Колясочная: SecurityAccess[];
    Лапомойка: SecurityAccess[];
    'Откатные ворота': SecurityAccess[];
    Подвал: SecurityAccess[];
    Шлагбаум: SecurityAccess[];
    Этаж: SecurityAccess[];
  };
  additional_cameras: SecurityCamera[];
  additional_intercoms: SecuritySlsIntercom[];
}
