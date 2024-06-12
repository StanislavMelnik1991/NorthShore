/* import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { IAccessPoint } from '@entities/types';
import styles from './Access.module.scss';

interface Props {
  className?: string;
  accessPoints: IAccessPoint;
}

export const AccessOld = ({ className, accessPoints }: Props) => {
  const { t } = useTranslation('residents');
  return (
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
                            onClick={() => setAccessPoint(elem?.id, 'Шлагбаум')}
                            key={'barrier' + i}
                          >
                            <p className={styles.underline}>{elem?.id}</p>
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
                            onClick={() => setAccessPoint(elem?.id, 'Калитка')}
                            key={'gate' + i}
                          >
                            <p className={styles.underline}>{elem?.id}</p>
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
                                setAccessPoint(elem?.id, 'Лапомойка')
                              }
                              key={'paw_washing' + i}
                            >
                              <p className={styles.underline}>{elem?.id}</p>
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
                            onClick={() => setAccessPoint(elem?.id, 'Велобокс')}
                            key={'bike_box' + i}
                          >
                            <p className={styles.underline}>{elem?.id}</p>
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
                                setAccessPoint(elem?.id, 'Колясочная')
                              }
                              key={'stroller' + i}
                            >
                              <p className={styles.underline}>{elem?.id}</p>
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
                            onClick={() => setAccessPoint(elem?.id, 'Ворота')}
                            key={'gates' + i}
                          >
                            <p className={styles.underline}>{elem?.id}</p>
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
                                setAccessPoint(elem?.id, 'Откатные ворота')
                              }
                              key={'sliding_gates' + i}
                            >
                              <p className={styles.underline}>{elem?.id}</p>
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
                            onClick={() => setAccessPoint(elem?.id, 'Этаж')}
                            key={'floor' + i}
                          >
                            <p className={styles.underline}>{elem?.id}</p>
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
                                  setAccessPoint(elem?.id, 'Шлагбаум');
                              }}
                              key={'barrier' + i}
                              className={classNames({
                                [styles.deleteble]: isUpdate === 'access point',
                              })}
                            >
                              <p className={styles.underline}>
                                {elem?.id}
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
                                  setAccessPoint(elem?.id, 'Калитка');
                              }}
                              key={'gate' + i}
                              className={classNames({
                                [styles.deleteble]: isUpdate === 'access point',
                              })}
                            >
                              <p className={styles.underline}>
                                {elem?.id}
                                {isUpdate === 'access point' && (
                                  <IconClose
                                    width={16}
                                    height={16}
                                    onClick={() =>
                                      handleOpenModal(
                                        elem?.id,
                                        'access point',
                                        elem?.name,
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
                                  setAccessPoint(elem?.id, 'Лапомойка');
                              }}
                              key={'paw_washing' + i}
                              className={classNames({
                                [styles.deleteble]: isUpdate === 'access point',
                              })}
                            >
                              <p className={styles.underline}>
                                {elem?.id}
                                {isUpdate === 'access point' && (
                                  <IconClose
                                    width={16}
                                    height={16}
                                    onClick={() =>
                                      handleOpenModal(
                                        elem?.id,
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
                                  setAccessPoint(elem?.id, 'Велобокс');
                              }}
                              key={'bike_box' + i}
                              className={classNames({
                                [styles.deleteble]: isUpdate === 'access point',
                              })}
                            >
                              <p className={styles.underline}>
                                {elem?.id}
                                {isUpdate === 'access point' && (
                                  <IconClose
                                    width={16}
                                    height={16}
                                    onClick={() =>
                                      handleOpenModal(
                                        elem?.id,
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
                                  setAccessPoint(elem?.id, 'Колясочная');
                              }}
                              key={'stroller' + i}
                              className={classNames({
                                [styles.deleteble]: isUpdate === 'access point',
                              })}
                            >
                              <p className={styles.underline}>
                                {elem?.id}
                                {isUpdate === 'access point' && (
                                  <IconClose
                                    width={16}
                                    height={16}
                                    onClick={() =>
                                      handleOpenModal(
                                        elem?.id,
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
                                  setAccessPoint(elem?.id, 'Ворота');
                              }}
                              key={'gates' + i}
                              className={classNames({
                                [styles.deleteble]: isUpdate === 'access point',
                              })}
                            >
                              <p className={styles.underline}>
                                {elem?.id}
                                {isUpdate === 'access point' && (
                                  <IconClose
                                    width={16}
                                    height={16}
                                    onClick={() =>
                                      handleOpenModal(
                                        elem?.id,
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
                                setAccessPoint(elem?.id, 'Откатные ворота');
                            }}
                            key={'sliding_gates' + i}
                            className={classNames({
                              [styles.deleteble]: isUpdate === 'access point',
                            })}
                          >
                            <p className={styles.underline}>
                              {elem?.id}
                              {isUpdate === 'access point' && (
                                <IconClose
                                  width={16}
                                  height={16}
                                  onClick={() =>
                                    handleOpenModal(
                                      elem?.id,
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
                                  setAccessPoint(elem?.id, 'Этаж');
                              }}
                              key={'floor' + i}
                              className={classNames({
                                [styles.deleteble]: isUpdate === 'access point',
                              })}
                            >
                              <p className={styles.underline}>
                                {elem?.id}
                                {isUpdate === 'access point' && (
                                  <IconClose
                                    width={16}
                                    height={16}
                                    onClick={() =>
                                      handleOpenModal(
                                        elem?.id,
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
                            onClick={() => setIntercom(elem?.id)}
                            key={'intercom' + i}
                          >
                            <p className={styles.underline}>{elem?.id}</p>
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
                              {elem?.id}
                              {isUpdate === 'intercom' && (
                                <IconClose
                                  width={16}
                                  height={16}
                                  onClick={() =>
                                    handleOpenModal(
                                      elem?.id,
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
                          onClick={() => setIntercom(elem?.id)}
                          key={'camera' + i}
                        >
                          <p className={styles.underline}>{elem?.id}</p>
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
                              if (isUpdate !== 'camera') setCamera(elem?.id);
                            }}
                            key={'additional_camera' + i}
                            className={classNames({
                              [styles.deleteble]: isUpdate === 'camera',
                            })}
                          >
                            <p className={styles.underline}>
                              {elem?.id}
                              {isUpdate === 'camera' && (
                                <IconClose
                                  width={16}
                                  height={16}
                                  onClick={() =>
                                    handleOpenModal(
                                      elem?.id,
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
                          <div onClick={() => setSls(elem?.id)} key={'sls' + i}>
                            <p className={styles.underline}>{elem?.id}</p>
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
    </table>
  );
};
 */
