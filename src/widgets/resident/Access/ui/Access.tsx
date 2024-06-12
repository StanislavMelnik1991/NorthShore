import classNames from 'classnames';
import {
  IAccessPoint,
  SecurityAccess,
  SecurityCamera,
  SecurityIntercom,
  SecuritySlsIntercom,
} from '@entities/types';
import { useAccess } from '../hook';
import styles from './Access.module.scss';
import { ResidentAccessContent } from './Content';
import { AddModal } from './modals';

interface Props {
  className?: string;
  selectPoint?: ((val?: SecurityAccess) => void) | false;
  selectIntercom?: ((val?: SecurityIntercom) => void) | false;
  selectCamera?: ((val?: SecurityCamera) => void) | false;
  selectSls?: ((val?: SecuritySlsIntercom) => void) | false;
  data?: IAccessPoint;
  id: number | string;
  handleUpdate: () => void;
}

export const ResidentAccess = ({
  className,
  selectPoint,
  selectIntercom,
  selectCamera,
  selectSls,
  data,
  id,
  handleUpdate,
}: Props) => {
  const {
    accessPoints,
    intercoms,
    cameras,
    additionalAccessPoints,
    additionalCameras,
    additionalIntercoms,
    sls_intercoms,
    t,
    isAddAccessOpen,
    setIsAddAccessOpen,
    isAddIntercomOpen,
    setIsAddIntercomOpen,
    isAddCameraOpen,
    setIsAddCameraOpen,
    addSecurity,
  } = useAccess({ data });
  return (
    <div className={classNames(styles.wrapper, className)}>
      <AddModal
        title={t('modal.titles.access_point')}
        options={addSecurity.access.options}
        onChange={addSecurity.access.setSelected}
        selected={addSecurity.access.selected}
        handleAdd={addSecurity.access.handleAdd}
        onClose={() => setIsAddAccessOpen(false)}
        isOpen={isAddAccessOpen}
        userId={id}
        handleUpdate={handleUpdate}
      />
      <AddModal
        title={t('modal.titles.intercom')}
        options={addSecurity.intercom.options}
        onChange={addSecurity.intercom.setSelected}
        selected={addSecurity.intercom.selected}
        handleAdd={addSecurity.intercom.handleAdd}
        onClose={() => setIsAddIntercomOpen(false)}
        isOpen={isAddIntercomOpen}
        userId={id}
        handleUpdate={handleUpdate}
      />
      <AddModal
        title={t('modal.titles.camera')}
        options={addSecurity.camera.options}
        onChange={addSecurity.camera.setSelected}
        selected={addSecurity.camera.selected}
        handleAdd={addSecurity.camera.handleAdd}
        onClose={() => setIsAddCameraOpen(false)}
        isOpen={isAddCameraOpen}
        userId={id}
        handleUpdate={handleUpdate}
      />
      {!!accessPoints.length && (
        <ResidentAccessContent
          title={t('tabs.access_points')}
          data={accessPoints}
          handleSelect={selectPoint}
        />
      )}
      <ResidentAccessContent
        title={t('info_fields.additional_access_points')}
        data={additionalAccessPoints}
        handleSelect={selectPoint}
        handleAdd={() => setIsAddAccessOpen(true)}
        handleDelete={(id) => {
          addSecurity.access.handleDelete(id);
          handleUpdate();
        }}
      />
      {!!intercoms.length && (
        <ResidentAccessContent
          title={t('info_fields.intercom')}
          data={[{ name: t('info_fields.intercom_one'), data: intercoms }]}
          handleSelect={selectIntercom}
        />
      )}
      <ResidentAccessContent
        title={t('info_fields.additional_intercoms')}
        handleDelete={(id) => {
          addSecurity.intercom.handleDelete(id);
          handleUpdate();
        }}
        data={
          additionalIntercoms.length
            ? [
                {
                  name: t('info_fields.intercom_one'),
                  data: additionalIntercoms,
                },
              ]
            : []
        }
        handleSelect={selectIntercom}
        handleAdd={() => setIsAddIntercomOpen(true)}
      />
      {!!cameras.length && (
        <ResidentAccessContent
          title={t('info_fields.cctv')}
          data={[{ data: cameras, name: t('info_fields.camera') }]}
          handleSelect={selectCamera}
        />
      )}
      <ResidentAccessContent
        title={t('info_fields.additional_cameras')}
        data={
          additionalCameras.length
            ? [{ data: additionalCameras, name: t('info_fields.camera') }]
            : []
        }
        handleSelect={selectCamera}
        handleDelete={async (id) => {
          await addSecurity.camera.handleDelete(id);
          handleUpdate();
        }}
        handleAdd={() => setIsAddCameraOpen(true)}
      />
      {!!sls_intercoms.length && (
        <ResidentAccessContent
          title={t('info_fields.sls')}
          data={[{ data: sls_intercoms, name: t('info_fields.sls') }]}
          handleSelect={selectSls}
        />
      )}
    </div>
  );
};
