import classNames from 'classnames';
import { PersonalNotification } from '@widgets/Content/personalNotification';
import {
  AccessInformation,
  ConfigInformation,
  MainInformation,
} from '@widgets/Security';
import { extractTextFromHtml } from '@features/utils';
import {
  PageHeader,
  PageSkeleton,
  Pagination,
  PerPage,
  Tab,
  Modal,
  CurrentSkeleton,
  StyledSelect,
  ModalDelete,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import {
  IconNew,
  IconPassed,
  IconAccepted,
  IconDone,
  IconClosed,
  IconMail,
  IconStaple,
  IconPlus,
  IconClose,
} from '@shared/icons';
import { Button, Card, Text, Loader, Badge, TextField } from '@shared/ui';
import { Table } from '@shared/ui/Table';
import { useResidentsList } from '../hooks';
import styles from './Page.module.scss';

const Page = () => {
  const {
    t,
    i18n,
    lang,
    id,
    data,
    open,
    setOpen,
    isLoading,
    isRequestsLoading,
    tableRequestsHeader,
    tableRequestsData,
    perRequestsPage,
    setPerRequestsPage,
    requestsTotal,
    setRequestsPage,
    openedRequest,
    setOpenedRequest,
    isNotificationsLoading,
    tableNotificationsHeader,
    tableNotificationsData,
    perNotificationsPage,
    setPerNotificationsPage,
    notificationsTotal,
    setNotificationsPage,
    openedNotification,
    setOpenedNotification,
    accessPoints,
    isAccessPointsLoading,
    accessPoint,
    setAccessPoint,
    addType,
    setAddType,
    accessPointsTypes,
    isAccessPointsTypesLoading,
    accessPointType,
    setAccessPointType,
    addNumber,
    setAddNumber,
    isAddLoading,
    handleAdd,
    isUpdate,
    setIsUpdate,
    handleDeleteAdditional,
    intercom,
    setIntercom,
    camera,
    setCamera,
    sls,
    setSls,
    isModalOpen,
    handleCloseModal,
    handleOpenModal,
    deletebleTitle,
  } = useResidentsList();
  const labels = [
    <Text variant="body16" fontWeight="medium" key={1}>
      {t('tabs.general_info')}
    </Text>,
    <Text variant="body16" fontWeight="medium" key={2}>
      {t('tabs.requests')}
    </Text>,
    <Text variant="body16" fontWeight="medium" key={3}>
      {t('tabs.access_points')}
    </Text>,
    <Text variant="body16" fontWeight="medium" key={4}>
      {t('tabs.notifications_history')}
    </Text>,
  ];

  const apartments = (
    <th className={styles.tab1__raw_text}>
      {data &&
        data.account_numbers &&
        data.account_numbers.map((elem, i) => (
          <div
            key={'i' + i}
          >{`${elem.apartment.entrance.building.street.name.trim()}, ${elem.apartment.entrance.building.name}, ${elem.apartment.name}`}</div>
        ))}
    </th>
  );

  const accounts = (
    <th className={styles.tab1__raw_text}>
      {data &&
        data.account_numbers &&
        data.account_numbers.map((elem, i) => (
          <div key={'acc' + i}>{elem.account}</div>
        ))}
    </th>
  );

  const tabs = [
    <table key={'tab1'} className={styles.tab1}>
      <tbody>
        <tr>
          <th className={styles.tab1__raw_title}>{t('info_fields.name')}</th>
          <th className={styles.tab1__raw_text}>{data?.name}</th>
        </tr>
        <tr>
          <th className={styles.tab1__raw_title}>
            {t('info_fields.phone_number')}
          </th>
          <th className={styles.tab1__raw_text}>{data?.phone_number}</th>
        </tr>
        <tr>
          <th className={styles.tab1__raw_title}>{t('info_fields.account')}</th>
          {accounts}
        </tr>
        <tr>
          <th className={styles.tab1__raw_title}>{t('info_fields.objects')}</th>
          {apartments}
        </tr>
        <tr>
          <th className={styles.tab1__raw_title}>{t('info_fields.lang')}</th>
          <th className={styles.tab1__raw_text}>
            {data?.lang === 'en' ? t('langs.en') : t('langs.ru')}
          </th>
        </tr>
        <tr>
          <th className={styles.tab1__raw_title}>{t('info_fields.mail')}</th>
          <th className={styles.tab1__raw_text}>{data?.email}</th>
        </tr>
        <tr>
          <th className={styles.tab1__raw_title}>
            {t('info_fields.password')}
          </th>
          <th className={styles.tab1__raw_text}>
            <Button variant="text" className={styles.password}>
              {t('info_fields.reset')}
            </Button>
          </th>
        </tr>
      </tbody>
    </table>,
    <div key={'tab2'} className={styles.tab2}>
      <Card
        className={styles.table}
        flexDirection="column"
        loading={isRequestsLoading}
      >
        <div className={styles.table__wrapper}>
          <Table
            config={tableRequestsHeader}
            items={tableRequestsData}
            handler={(val: string) => setOpenedRequest(val)}
          />
        </div>
        <div className={styles.controls}>
          <PerPage active={perRequestsPage} setActive={setPerRequestsPage} />
          <Pagination total={requestsTotal} onChange={setRequestsPage} />
        </div>
      </Card>
    </div>,
    <table key={'tab3'} className={styles.tab3}>
      <tbody>
        <tr className={styles.dark_raw}>
          <th className={styles.tab3__raw_title}>{t('tabs.access_points')}</th>
          <th className={styles.tab3__raw_text}>
            <table>
              <tbody>
                {accessPoints?.access_points.Шлагбаум &&
                  accessPoints?.access_points.Шлагбаум.length > 0 && (
                    <tr>
                      <th className={styles.tab3__raw_text__title}>
                        {t('info_fields.barrier')}
                      </th>
                      <th className={styles.tab3__raw_text__text}>
                        {'№'}
                        {accessPoints?.access_points.Шлагбаум.map((elem, i) => (
                          <div
                            onClick={() => setAccessPoint(elem.id, 'Шлагбаум')}
                            key={'barrier' + i}
                          >
                            <p className={styles.underline}>{elem.id}</p>
                            {i < accessPoints?.access_points.Шлагбаум.length - 1
                              ? ', '
                              : ''}
                          </div>
                        ))}
                      </th>
                    </tr>
                  )}
                {accessPoints?.access_points.Калитка &&
                  accessPoints?.access_points.Калитка.length > 0 && (
                    <tr>
                      <th className={styles.tab3__raw_text__title}>
                        {t('info_fields.gate')}
                      </th>
                      <th className={styles.tab3__raw_text__text}>
                        {'№'}
                        {accessPoints?.access_points.Калитка.map((elem, i) => (
                          <div
                            onClick={() => setAccessPoint(elem.id, 'Калитка')}
                            key={'gate' + i}
                          >
                            <p className={styles.underline}>{elem.id}</p>
                            {i < accessPoints?.access_points.Калитка.length - 1
                              ? ', '
                              : ''}
                          </div>
                        ))}
                      </th>
                    </tr>
                  )}
                {accessPoints?.access_points.Лапомойка &&
                  accessPoints?.access_points.Лапомойка.length > 0 && (
                    <tr>
                      <th className={styles.tab3__raw_text__title}>
                        {t('info_fields.paw_washing')}
                      </th>
                      <th className={styles.tab3__raw_text__text}>
                        {'№'}
                        {accessPoints?.access_points.Лапомойка.map(
                          (elem, i) => (
                            <div
                              onClick={() =>
                                setAccessPoint(elem.id, 'Лапомойка')
                              }
                              key={'paw_washing' + i}
                            >
                              <p className={styles.underline}>{elem.id}</p>
                              {i <
                              accessPoints?.access_points.Лапомойка.length - 1
                                ? ', '
                                : ''}
                            </div>
                          ),
                        )}
                      </th>
                    </tr>
                  )}
                {accessPoints?.access_points.Велобокс &&
                  accessPoints?.access_points.Велобокс.length > 0 && (
                    <tr>
                      <th className={styles.tab3__raw_text__title}>
                        {t('info_fields.bike_box')}
                      </th>
                      <th className={styles.tab3__raw_text__text}>
                        {'№'}
                        {accessPoints?.access_points.Велобокс.map((elem, i) => (
                          <div
                            onClick={() => setAccessPoint(elem.id, 'Велобокс')}
                            key={'bike_box' + i}
                          >
                            <p className={styles.underline}>{elem.id}</p>
                            {i < accessPoints?.access_points.Велобокс.length - 1
                              ? ', '
                              : ''}
                          </div>
                        ))}
                      </th>
                    </tr>
                  )}
                {accessPoints?.access_points.Колясочная &&
                  accessPoints?.access_points.Колясочная.length > 0 && (
                    <tr>
                      <th className={styles.tab3__raw_text__title}>
                        {t('info_fields.stroller')}
                      </th>
                      <th className={styles.tab3__raw_text__text}>
                        {'№'}
                        {accessPoints?.access_points.Колясочная.map(
                          (elem, i) => (
                            <div
                              onClick={() =>
                                setAccessPoint(elem.id, 'Колясочная')
                              }
                              key={'stroller' + i}
                            >
                              <p className={styles.underline}>{elem.id}</p>
                              {i <
                              accessPoints?.access_points.Колясочная.length - 1
                                ? ', '
                                : ''}
                            </div>
                          ),
                        )}
                      </th>
                    </tr>
                  )}
                {accessPoints?.access_points.Ворота &&
                  accessPoints?.access_points.Ворота.length > 0 && (
                    <tr>
                      <th className={styles.tab3__raw_text__title}>
                        {t('info_fields.gates')}
                      </th>
                      <th className={styles.tab3__raw_text__text}>
                        {'№'}
                        {accessPoints?.access_points.Ворота.map((elem, i) => (
                          <div
                            onClick={() => setAccessPoint(elem.id, 'Ворота')}
                            key={'gates' + i}
                          >
                            <p className={styles.underline}>{elem.id}</p>
                            {i < accessPoints?.access_points.Ворота.length - 1
                              ? ','
                              : ''}
                          </div>
                        ))}
                      </th>
                    </tr>
                  )}
                {accessPoints?.access_points['Откатные ворота'] &&
                  accessPoints?.access_points['Откатные ворота'].length > 0 && (
                    <tr>
                      <th className={styles.tab3__raw_text__title}>
                        {t('info_fields.sliding_gates')}
                      </th>
                      <th className={styles.tab3__raw_text__text}>
                        {'№'}
                        {accessPoints?.access_points['Откатные ворота'].map(
                          (elem, i) => (
                            <div
                              onClick={() =>
                                setAccessPoint(elem.id, 'Откатные ворота')
                              }
                              key={'sliding_gates' + i}
                            >
                              <p className={styles.underline}>{elem.id}</p>
                              {i <
                              accessPoints?.access_points['Откатные ворота']
                                .length -
                                1
                                ? ','
                                : ''}
                            </div>
                          ),
                        )}
                      </th>
                    </tr>
                  )}
                {accessPoints?.access_points.Этаж &&
                  accessPoints?.access_points.Этаж.length > 0 && (
                    <tr>
                      <th className={styles.tab3__raw_text__title}>
                        {t('info_fields.floor')}
                      </th>
                      <th className={styles.tab3__raw_text__text}>
                        {'№'}
                        {accessPoints?.access_points.Этаж.map((elem, i) => (
                          <div
                            onClick={() => setAccessPoint(elem.id, 'Этаж')}
                            key={'floor' + i}
                          >
                            <p className={styles.underline}>{elem.id}</p>
                            {i < accessPoints?.access_points.Этаж.length - 1
                              ? ','
                              : ''}
                          </div>
                        ))}
                      </th>
                    </tr>
                  )}
              </tbody>
            </table>
          </th>
        </tr>
        <tr>
          <th className={styles.tab3__raw_title}>
            {t('info_fields.additional_access_points')}
          </th>
          <th className={styles.tab3__raw_text_light}>
            <Button
              className={styles.changeBtn}
              variant="text"
              onClick={() => {
                if (isUpdate === 'access point') {
                  setIsUpdate(undefined);
                } else {
                  setIsUpdate('access point');
                }
              }}
            >
              {isUpdate === 'access point'
                ? t('btns.cancel')
                : t('btns.change')}
            </Button>
            <table>
              <tbody>
                {accessPoints?.additional_access_points.Шлагбаум &&
                  accessPoints?.additional_access_points.Шлагбаум.length >
                    0 && (
                    <tr>
                      <th className={styles.tab3__raw_text__title}>
                        {t('info_fields.barrier')}
                      </th>
                      <th className={styles.tab3__raw_text__text}>
                        {'№'}
                        {accessPoints?.additional_access_points.Шлагбаум.map(
                          (elem, i) => (
                            <div
                              onClick={() => {
                                if (isUpdate !== 'access point')
                                  setAccessPoint(elem.id, 'Шлагбаум');
                              }}
                              key={'barrier' + i}
                              className={classNames({
                                [styles.deleteble]: isUpdate === 'access point',
                              })}
                            >
                              <p className={styles.underline}>
                                {elem.id}
                                {isUpdate === 'access point' && (
                                  <IconClose
                                    width={16}
                                    height={16}
                                    onClick={() =>
                                      handleOpenModal(
                                        elem.id,
                                        'access point',
                                        elem.name,
                                      )
                                    }
                                  />
                                )}
                              </p>
                              {i <
                              accessPoints?.additional_access_points.Шлагбаум
                                .length -
                                1
                                ? ', '
                                : ''}
                            </div>
                          ),
                        )}
                      </th>
                    </tr>
                  )}
                {accessPoints?.additional_access_points.Калитка &&
                  accessPoints?.additional_access_points.Калитка.length > 0 && (
                    <tr>
                      <th className={styles.tab3__raw_text__title}>
                        {t('info_fields.gate')}
                      </th>
                      <th className={styles.tab3__raw_text__text}>
                        {'№'}
                        {accessPoints?.additional_access_points.Калитка.map(
                          (elem, i) => (
                            <div
                              onClick={() => {
                                if (isUpdate !== 'access point')
                                  setAccessPoint(elem.id, 'Калитка');
                              }}
                              key={'gate' + i}
                              className={classNames({
                                [styles.deleteble]: isUpdate === 'access point',
                              })}
                            >
                              <p className={styles.underline}>
                                {elem.id}
                                {isUpdate === 'access point' && (
                                  <IconClose
                                    width={16}
                                    height={16}
                                    onClick={() =>
                                      handleOpenModal(
                                        elem.id,
                                        'access point',
                                        elem.name,
                                      )
                                    }
                                  />
                                )}
                              </p>
                              {i <
                              accessPoints?.additional_access_points.Калитка
                                .length -
                                1
                                ? ', '
                                : ''}
                            </div>
                          ),
                        )}
                      </th>
                    </tr>
                  )}
                {accessPoints?.additional_access_points.Лапомойка &&
                  accessPoints?.additional_access_points.Лапомойка.length >
                    0 && (
                    <tr>
                      <th className={styles.tab3__raw_text__title}>
                        {t('info_fields.paw_washing')}
                      </th>
                      <th className={styles.tab3__raw_text__text}>
                        {'№'}
                        {accessPoints?.additional_access_points.Лапомойка.map(
                          (elem, i) => (
                            <div
                              onClick={() => {
                                if (isUpdate !== 'access point')
                                  setAccessPoint(elem.id, 'Лапомойка');
                              }}
                              key={'paw_washing' + i}
                              className={classNames({
                                [styles.deleteble]: isUpdate === 'access point',
                              })}
                            >
                              <p className={styles.underline}>
                                {elem.id}
                                {isUpdate === 'access point' && (
                                  <IconClose
                                    width={16}
                                    height={16}
                                    onClick={() =>
                                      handleOpenModal(
                                        elem.id,
                                        'access point',
                                        elem.name,
                                      )
                                    }
                                  />
                                )}
                              </p>
                              {i <
                              accessPoints?.additional_access_points.Лапомойка
                                .length -
                                1
                                ? ', '
                                : ''}
                            </div>
                          ),
                        )}
                      </th>
                    </tr>
                  )}
                {accessPoints?.additional_access_points.Велобокс &&
                  accessPoints?.additional_access_points.Велобокс.length >
                    0 && (
                    <tr>
                      <th className={styles.tab3__raw_text__title}>
                        {t('info_fields.bike_box')}
                      </th>
                      <th className={styles.tab3__raw_text__text}>
                        {'№'}
                        {accessPoints?.additional_access_points.Велобокс.map(
                          (elem, i) => (
                            <div
                              onClick={() => {
                                if (isUpdate !== 'access point')
                                  setAccessPoint(elem.id, 'Велобокс');
                              }}
                              key={'bike_box' + i}
                              className={classNames({
                                [styles.deleteble]: isUpdate === 'access point',
                              })}
                            >
                              <p className={styles.underline}>
                                {elem.id}
                                {isUpdate === 'access point' && (
                                  <IconClose
                                    width={16}
                                    height={16}
                                    onClick={() =>
                                      handleOpenModal(
                                        elem.id,
                                        'access point',
                                        elem.name,
                                      )
                                    }
                                  />
                                )}
                              </p>
                              {i <
                              accessPoints?.additional_access_points.Велобокс
                                .length -
                                1
                                ? ', '
                                : ''}
                            </div>
                          ),
                        )}
                      </th>
                    </tr>
                  )}
                {accessPoints?.additional_access_points.Колясочная &&
                  accessPoints?.additional_access_points.Колясочная.length >
                    0 && (
                    <tr>
                      <th className={styles.tab3__raw_text__title}>
                        {t('info_fields.stroller')}
                      </th>
                      <th className={styles.tab3__raw_text__text}>
                        {'№'}
                        {accessPoints?.additional_access_points.Колясочная.map(
                          (elem, i) => (
                            <div
                              onClick={() => {
                                if (isUpdate !== 'access point')
                                  setAccessPoint(elem.id, 'Колясочная');
                              }}
                              key={'stroller' + i}
                              className={classNames({
                                [styles.deleteble]: isUpdate === 'access point',
                              })}
                            >
                              <p className={styles.underline}>
                                {elem.id}
                                {isUpdate === 'access point' && (
                                  <IconClose
                                    width={16}
                                    height={16}
                                    onClick={() =>
                                      handleOpenModal(
                                        elem.id,
                                        'access point',
                                        elem.name,
                                      )
                                    }
                                  />
                                )}
                              </p>
                              {i <
                              accessPoints?.additional_access_points.Колясочная
                                .length -
                                1
                                ? ', '
                                : ''}
                            </div>
                          ),
                        )}
                      </th>
                    </tr>
                  )}
                {accessPoints?.additional_access_points.Ворота &&
                  accessPoints?.additional_access_points.Ворота.length > 0 && (
                    <tr>
                      <th className={styles.tab3__raw_text__title}>
                        {t('info_fields.gates')}
                      </th>
                      <th className={styles.tab3__raw_text__text}>
                        {'№'}
                        {accessPoints?.additional_access_points.Ворота.map(
                          (elem, i) => (
                            <div
                              onClick={() => {
                                if (isUpdate !== 'access point')
                                  setAccessPoint(elem.id, 'Ворота');
                              }}
                              key={'gates' + i}
                              className={classNames({
                                [styles.deleteble]: isUpdate === 'access point',
                              })}
                            >
                              <p className={styles.underline}>
                                {elem.id}
                                {isUpdate === 'access point' && (
                                  <IconClose
                                    width={16}
                                    height={16}
                                    onClick={() =>
                                      handleOpenModal(
                                        elem.id,
                                        'access point',
                                        elem.name,
                                      )
                                    }
                                  />
                                )}
                              </p>
                              {i <
                              accessPoints?.additional_access_points.Ворота
                                .length -
                                1
                                ? ','
                                : ''}
                            </div>
                          ),
                        )}
                      </th>
                    </tr>
                  )}
                {accessPoints?.additional_access_points['Откатные ворота'] &&
                  accessPoints?.additional_access_points['Откатные ворота']
                    .length > 0 && (
                    <tr>
                      <th className={styles.tab3__raw_text__title}>
                        {t('info_fields.sliding_gates')}
                      </th>
                      <th className={styles.tab3__raw_text__text}>
                        {'№'}
                        {accessPoints?.additional_access_points[
                          'Откатные ворота'
                        ].map((elem, i) => (
                          <div
                            onClick={() => {
                              if (isUpdate !== 'access point')
                                setAccessPoint(elem.id, 'Откатные ворота');
                            }}
                            key={'sliding_gates' + i}
                            className={classNames({
                              [styles.deleteble]: isUpdate === 'access point',
                            })}
                          >
                            <p className={styles.underline}>
                              {elem.id}
                              {isUpdate === 'access point' && (
                                <IconClose
                                  width={16}
                                  height={16}
                                  onClick={() =>
                                    handleOpenModal(
                                      elem.id,
                                      'access point',
                                      elem.name,
                                    )
                                  }
                                />
                              )}
                            </p>
                            {i <
                            accessPoints?.additional_access_points[
                              'Откатные ворота'
                            ].length -
                              1
                              ? ','
                              : ''}
                          </div>
                        ))}
                      </th>
                    </tr>
                  )}
                {accessPoints?.additional_access_points.Этаж &&
                  accessPoints?.additional_access_points.Этаж.length > 0 && (
                    <tr>
                      <th className={styles.tab3__raw_text__title}>
                        {t('info_fields.floor')}
                      </th>
                      <th className={styles.tab3__raw_text__text}>
                        {'№'}
                        {accessPoints?.additional_access_points.Этаж.map(
                          (elem, i) => (
                            <div
                              onClick={() => {
                                if (isUpdate !== 'access point')
                                  setAccessPoint(elem.id, 'Этаж');
                              }}
                              key={'floor' + i}
                              className={classNames({
                                [styles.deleteble]: isUpdate === 'access point',
                              })}
                            >
                              <p className={styles.underline}>
                                {elem.id}
                                {isUpdate === 'access point' && (
                                  <IconClose
                                    width={16}
                                    height={16}
                                    onClick={() =>
                                      handleOpenModal(
                                        elem.id,
                                        'access point',
                                        elem.name,
                                      )
                                    }
                                  />
                                )}
                              </p>
                              {i <
                              accessPoints?.additional_access_points.Этаж
                                .length -
                                1
                                ? ','
                                : ''}
                            </div>
                          ),
                        )}
                      </th>
                    </tr>
                  )}
              </tbody>
            </table>
            <Button
              onClick={() => setAddType('access point')}
              variant="text"
              disabled={!!isUpdate}
            >
              <div
                className={classNames(styles.plus, {
                  [styles.disabled]: !!isUpdate,
                })}
              >
                <IconPlus />
              </div>
              {t('info_fields.add')}
            </Button>
          </th>
        </tr>
        <tr className={styles.dark_raw}>
          <th className={styles.tab3__raw_title}>
            {t('info_fields.intercom')}
          </th>
          <th className={styles.tab3__raw_text}>
            <table>
              <tbody>
                {accessPoints?.intercoms &&
                  accessPoints?.intercoms.length > 0 && (
                    <tr>
                      <th className={styles.tab3__raw_text__title}>
                        {t('info_fields.intercom_one')}
                      </th>
                      <th className={styles.tab3__raw_text__text}>
                        {'№'}
                        {accessPoints?.intercoms.map((elem, i) => (
                          <div
                            onClick={() => setIntercom(elem.id)}
                            key={'intercom' + i}
                          >
                            <p className={styles.underline}>{elem.id}</p>
                            {i < accessPoints?.intercoms.length - 1 ? ', ' : ''}
                          </div>
                        ))}
                      </th>
                    </tr>
                  )}
              </tbody>
            </table>
          </th>
        </tr>
        <tr>
          <th className={styles.tab3__raw_title}>
            {t('info_fields.additional_intercoms')}
          </th>
          <th className={styles.tab3__raw_text_light}>
            <Button
              className={styles.changeBtn}
              variant="text"
              onClick={() => {
                if (isUpdate === 'intercom') {
                  setIsUpdate(undefined);
                } else {
                  setIsUpdate('intercom');
                }
              }}
            >
              {isUpdate === 'intercom' ? t('btns.cancel') : t('btns.change')}
            </Button>
            <table>
              <tbody>
                {accessPoints?.additional_intercoms &&
                  accessPoints?.additional_intercoms.length > 0 && (
                    <tr>
                      <th className={styles.tab3__raw_text__title}>
                        {t('info_fields.intercom_one')}
                      </th>
                      <th className={styles.tab3__raw_text__text}>
                        {'№'}
                        {accessPoints?.additional_intercoms.map((elem, i) => (
                          <div
                            onClick={() => {
                              if (isUpdate !== 'intercom') setIntercom(elem.id);
                            }}
                            key={'additional_intercom' + i}
                            className={classNames({
                              [styles.deleteble]: isUpdate === 'intercom',
                            })}
                          >
                            <p className={styles.underline}>
                              {elem.id}
                              {isUpdate === 'intercom' && (
                                <IconClose
                                  width={16}
                                  height={16}
                                  onClick={() =>
                                    handleOpenModal(
                                      elem.id,
                                      'intercom',
                                      elem.name,
                                    )
                                  }
                                />
                              )}
                            </p>
                            {i < accessPoints?.additional_intercoms.length - 1
                              ? ', '
                              : ''}
                          </div>
                        ))}
                      </th>
                    </tr>
                  )}
              </tbody>
            </table>
            <Button
              onClick={() => setAddType('intercom')}
              variant="text"
              disabled={!!isUpdate}
            >
              <div
                className={classNames(styles.plus, {
                  [styles.disabled]: !!isUpdate,
                })}
              >
                <IconPlus />
              </div>
              {t('info_fields.add')}
            </Button>
          </th>
        </tr>
        <tr className={styles.dark_raw}>
          <th className={styles.tab3__raw_title}>{t('info_fields.cctv')}</th>
          <th className={styles.tab3__raw_text}>
            <table>
              <tbody>
                {accessPoints?.cameras && accessPoints?.cameras.length > 0 && (
                  <tr>
                    <th className={styles.tab3__raw_text__title}>
                      {t('info_fields.camera')}
                    </th>
                    <th className={styles.tab3__raw_text__text}>
                      {'№'}
                      {accessPoints?.cameras.map((elem, i) => (
                        <div
                          onClick={() => setIntercom(elem.id)}
                          key={'camera' + i}
                        >
                          <p className={styles.underline}>{elem.id}</p>
                          {i < accessPoints?.cameras.length - 1 ? ', ' : ''}
                        </div>
                      ))}
                    </th>
                  </tr>
                )}
              </tbody>
            </table>
          </th>
        </tr>
        <tr>
          <th className={styles.tab3__raw_title}>
            {t('info_fields.additional_cameras')}
          </th>
          <th className={styles.tab3__raw_text_light}>
            <Button
              className={styles.changeBtn}
              variant="text"
              onClick={() => {
                if (isUpdate === 'camera') {
                  setIsUpdate(undefined);
                } else {
                  setIsUpdate('camera');
                }
              }}
            >
              {isUpdate === 'camera' ? t('btns.cancel') : t('btns.change')}
            </Button>
            <table>
              <tbody>
                {accessPoints?.additional_cameras &&
                  accessPoints?.additional_cameras.length > 0 && (
                    <tr>
                      <th className={styles.tab3__raw_text__title}>
                        {t('info_fields.camera')}
                      </th>
                      <th className={styles.tab3__raw_text__text}>
                        {'№'}
                        {accessPoints?.additional_cameras.map((elem, i) => (
                          <div
                            onClick={() => {
                              if (isUpdate !== 'camera') setCamera(elem.id);
                            }}
                            key={'additional_camera' + i}
                            className={classNames({
                              [styles.deleteble]: isUpdate === 'camera',
                            })}
                          >
                            <p className={styles.underline}>
                              {elem.id}
                              {isUpdate === 'camera' && (
                                <IconClose
                                  width={16}
                                  height={16}
                                  onClick={() =>
                                    handleOpenModal(
                                      elem.id,
                                      'camera',
                                      elem.name,
                                    )
                                  }
                                />
                              )}
                            </p>
                            {i < accessPoints?.additional_cameras.length - 1
                              ? ', '
                              : ''}
                          </div>
                        ))}
                      </th>
                    </tr>
                  )}
              </tbody>
            </table>
            <Button
              onClick={() => setAddType('camera')}
              variant="text"
              disabled={!!isUpdate}
            >
              <div
                className={classNames(styles.plus, {
                  [styles.disabled]: !!isUpdate,
                })}
              >
                <IconPlus />
              </div>
              {t('info_fields.add')}
            </Button>
          </th>
        </tr>
        <tr className={styles.dark_raw}>
          <th className={styles.tab3__raw_title}>{t('info_fields.sls')}</th>
          <th className={styles.tab3__raw_text}>
            <table>
              <tbody>
                {accessPoints?.sls_intercoms &&
                  accessPoints?.sls_intercoms.length > 0 && (
                    <tr>
                      <th className={styles.tab3__raw_text__title}>
                        {t('info_fields.sls')}
                      </th>
                      <th className={styles.tab3__raw_text__text}>
                        {'№'}
                        {accessPoints?.sls_intercoms.map((elem, i) => (
                          <div onClick={() => setSls(elem.id)} key={'sls' + i}>
                            <p className={styles.underline}>{elem.id}</p>
                            {i < accessPoints?.sls_intercoms.length - 1
                              ? ', '
                              : ''}
                          </div>
                        ))}
                      </th>
                    </tr>
                  )}
              </tbody>
            </table>
          </th>
        </tr>
      </tbody>
    </table>,
    <div key={'tab4'} className={styles.tab4}>
      <Card
        className={styles.table}
        flexDirection="column"
        loading={isNotificationsLoading}
      >
        <div className={styles.table__wrapper}>
          <Table
            config={tableNotificationsHeader}
            items={tableNotificationsData}
            handler={(val: string) => setOpenedNotification(val)}
          />
        </div>
        <div className={styles.controls}>
          <PerPage
            active={perNotificationsPage}
            setActive={setPerNotificationsPage}
          />
          <Pagination
            total={notificationsTotal}
            onChange={setNotificationsPage}
          />
        </div>
      </Card>
    </div>,
  ];

  const accessPointLabels = [
    <Text
      variant="body16"
      fontWeight="medium"
      key={`camera_details-tab-label-1`}
    >
      {t('tabs.main')}
    </Text>,
    <Text
      variant="body16"
      fontWeight="medium"
      key={`camera_details-tab-label-2`}
    >
      {t('tabs.config')}
    </Text>,
    <Text
      variant="body16"
      fontWeight="medium"
      key={`camera_details-tab-label-3`}
    >
      {`${t('tabs.access')} (${accessPoint?.entrances.length})`}
    </Text>,
  ];

  return (
    <PageSkeleton>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalDelete
          handleCloseModal={handleCloseModal}
          handleDelete={handleDeleteAdditional}
          text={t('remove.delete') + deletebleTitle + t('remove.text')}
          title={t('remove.title')}
        />
      </Modal>
      <PageHeader
        breadcrumbs={[
          {
            href: AppRoutes[AppRoutesEnum.RESIDENTS](),
            title: t('routes.residents'),
          },
          { href: '', title: t('routes.resident') + ' № ' + id },
        ]}
        lastTitle={data?.name}
        controls={
          <Button variant="primary" size="large" onClick={() => setOpen(true)}>
            <IconMail width={20} height={20} />
            {t('controls.personal_notification')}
          </Button>
        }
      />
      {id && <PersonalNotification id={id} open={open} setOpen={setOpen} />}
      {openedRequest && (
        <Modal
          isOpen={!!openedRequest}
          onClose={() => setOpenedRequest(undefined)}
        >
          <div className={styles.modal__wrapper}>
            <div className={styles.bages}>
              <Badge color="white">
                {new Date(openedRequest.data_add).toLocaleDateString(
                  i18n.language,
                  {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  },
                )}
              </Badge>
              <Badge color="blue">{openedRequest.theme.name}</Badge>
            </div>
            <Text
              className={styles.request_title}
            >{`${t('modal.request')} ${'№' + openedRequest.id}`}</Text>
            {openedRequest.title && (
              <Text className={styles.request_subtitle}>
                {openedRequest.title}
              </Text>
            )}
            <Text
              className={classNames(styles.status_raw, {
                [styles.gray]: openedRequest.status.id === 5,
                [styles.green]:
                  openedRequest.status.id === 3 ||
                  openedRequest.status.id === 4,
                [styles.primary]: openedRequest.status.id === 1,
                [styles.orange]: openedRequest.status.id === 2,
              })}
            >
              {openedRequest.status.id === 1 && <IconNew />}
              {openedRequest.status.id === 2 && <IconPassed />}
              {openedRequest.status.id === 3 && <IconAccepted />}
              {openedRequest.status.id === 4 && <IconDone />}
              {openedRequest.status.id === 5 && <IconClosed />}
              {openedRequest.status.name}
            </Text>
            <Text variant="body16">{openedRequest.content}</Text>
            {openedRequest && openedRequest.files.length > 0 && (
              <div className={styles.modal__image_wrapper}>
                <IconStaple />
                {openedRequest.files.map((elem, i) => (
                  <div
                    className={styles.modal__image}
                    key={'item' + i}
                    style={{ background: `url(${elem.url})` }}
                  ></div>
                ))}
              </div>
            )}
            {openedRequest.comment && (
              <div className={styles.comment__wrapper}>
                <Text className={styles.commnt__title}>
                  {t('modal.comment')}
                </Text>
                <Text variant="body16">{openedRequest.comment}</Text>
              </div>
            )}
          </div>
        </Modal>
      )}
      {openedNotification && (
        <Modal
          isOpen={!!openedNotification}
          onClose={() => setOpenedNotification(undefined)}
        >
          <div className={styles.notification__wrapper}>
            <Text
              className={styles.notification_title}
            >{`${t('modal.notification')} ${'№' + openedNotification.id}`}</Text>
            <Text className={styles.notification_date}>
              {new Date(openedNotification.data_add).toLocaleDateString(
                i18n.language,
                {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                },
              )}
            </Text>
            {openedNotification.title[lang] && (
              <Text className={styles.notification_subtitle}>
                {openedNotification.title[lang]}
              </Text>
            )}
            {openedNotification.body[lang] && (
              <div
                className={styles.htmlContent}
                dangerouslySetInnerHTML={{
                  __html: extractTextFromHtml(openedNotification.body[lang]),
                }}
              />
            )}
          </div>
        </Modal>
      )}
      {accessPoint && (
        <Modal
          className={styles.content__wrapper}
          isOpen={!!accessPoint}
          onClose={() => setAccessPoint()}
        >
          <Text
            className={styles.content__title}
          >{`${accessPoint.type.name} № ${accessPoint.id}`}</Text>
          <CurrentSkeleton className={styles.content}>
            <Tab
              labels={accessPointLabels}
              tabs={[
                <MainInformation
                  key={`main_camera_information-${accessPoint.id}`}
                  data={accessPoint}
                />,
                <ConfigInformation
                  key={`main_camera_information-${accessPoint.id}`}
                  data={accessPoint}
                />,
                <AccessInformation
                  key={`main_camera_information-${accessPoint.id}`}
                  data={accessPoint}
                />,
              ]}
            />
          </CurrentSkeleton>
        </Modal>
      )}
      {intercom && (
        <Modal
          className={styles.content__wrapper}
          isOpen={!!intercom}
          onClose={() => setIntercom()}
        >
          <Text
            className={styles.content__title}
          >{`${intercom.name} № ${intercom.id}`}</Text>
          <CurrentSkeleton className={styles.content}>
            <Tab
              labels={accessPointLabels.slice(0, 2)}
              tabs={[
                <MainInformation
                  key={`intercom-${intercom.id}`}
                  data={intercom}
                />,
                <ConfigInformation
                  key={`intercom-${intercom.id}`}
                  data={intercom}
                />,
              ]}
            />
          </CurrentSkeleton>
        </Modal>
      )}
      {camera && (
        <Modal
          className={styles.content__wrapper}
          isOpen={!!camera}
          onClose={() => setCamera()}
        >
          <Text
            className={styles.content__title}
          >{`${camera.name} № ${camera.id}`}</Text>
          <CurrentSkeleton className={styles.content}>
            <Tab
              labels={accessPointLabels}
              tabs={[
                <MainInformation key={`camera-${camera.id}`} data={camera} />,
                <ConfigInformation key={`camera-${camera.id}`} data={camera} />,
                <AccessInformation key={`camera-${camera.id}`} data={camera} />,
              ]}
            />
          </CurrentSkeleton>
        </Modal>
      )}
      {sls && (
        <Modal
          className={styles.content__wrapper}
          isOpen={!!sls}
          onClose={() => setSls()}
        >
          <Text
            className={styles.content__title}
          >{`${sls.name} № ${sls.id}`}</Text>
          <CurrentSkeleton className={styles.content}>
            <Tab
              labels={accessPointLabels.slice(0, 1)}
              tabs={[<MainInformation key={`sls-${sls.id}`} data={sls} />]}
            />
          </CurrentSkeleton>
        </Modal>
      )}
      {addType && (
        <Modal isOpen={!!addType} onClose={() => setAddType(undefined)}>
          <div className={styles.add__wrapper}>
            <div className={styles.add__title}>
              {addType === 'access point'
                ? t('modal.titles.access_point')
                : addType === 'intercom'
                  ? t('modal.titles.intercom')
                  : t('modal.titles.camera')}
            </div>
            {/* {addType === 'access point' && !isAccessPointsTypesLoading && (
              <StyledSelect
                label={t('modal.subtitles.access_point_type')}
                placeholder={t('modal.placeholders.type')}
                value={
                  accessPointType
                    ? {
                        value: accessPointType.id,
                        label: accessPointType?.name,
                      }
                    : undefined
                }
                onChange={(val) => {
                  if (val) {
                    setAccessPointType(
                      Number((val as { value: number; label: string }).value),
                    );
                  } else {
                    setAccessPointType();
                  }
                }}
                options={accessPointsTypes?.map((el) => {
                  return {
                    value: el.id,
                    label: el.name,
                  };
                })}
              />
            )} */}
            <TextField
              value={addNumber}
              onChange={(ev) => {
                const val = ev.target.value;
                if (val && !isNaN(+val)) {
                  setAddNumber(+val);
                }
              }}
              placeholder={t('modal.placeholders.number')}
              label={
                addType === 'access point'
                  ? t('modal.subtitles.access_point')
                  : addType === 'intercom'
                    ? t('modal.subtitles.intercom')
                    : t('modal.subtitles.camera')
              }
            />
            <div className={styles.btns__wrapper}>
              <Button
                variant="primary"
                width={170}
                disabled={
                  !addNumber
                  // || (addType === 'access point' && !accessPointType)
                }
                onClick={async () => {
                  await handleAdd();
                  setOpen(false);
                }}
                loading={isAddLoading}
              >
                {t('btns.add')}
              </Button>
              <Button
                variant="light"
                width={170}
                className={styles.text_primary}
                onClick={() => {
                  setAddType(undefined);
                }}
              >
                {t('btns.cancel')}
              </Button>
            </div>
          </div>
        </Modal>
      )}
      <Card className={styles.card}>
        {(isLoading || isAccessPointsLoading) && (
          <div className={styles.loader}>
            <Loader size={80} />
          </div>
        )}
        <Tab labels={labels} tabs={tabs} />
      </Card>
    </PageSkeleton>
  );
};

export default Page;
