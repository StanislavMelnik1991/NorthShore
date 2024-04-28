import { FormikErrors } from 'formik';
import { AddressFilters } from '@features/address';
import { ISelectOption, StyledSelect } from '@entities/components';
import { SipData } from '@entities/components';
import { TextField } from '@shared/ui';
import { useIntercomDataEditor } from '../hook';
import styles from './Editor.module.scss';

type Data = {
  type: ISelectOption | null;
  sip_account: ISelectOption | null;
  ip_address?: string;
  hls_url?: string;
  mp4_url?: string;
  rtsp_url?: string;
  type_id?: number;
  sip_account_id?: number;
  entrance_id?: number;
};

interface Props {
  values: Data;
  errors: FormikErrors<Data>;
  initialAddress?: {
    street?: ISelectOption;
    building?: ISelectOption;
    entrance?: ISelectOption;
  };
  setFieldValue: (
    field: keyof Data,
    value: string | ISelectOption | null | undefined | number,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<Data>>;
}

export const SecurityIntercomDataEditor = ({
  values,
  setFieldValue,
  errors,
  initialAddress,
}: Props) => {
  const {
    t,
    type,
    isTypeLoading,
    handleChangeTypeSelection,
    handleChangeSipSelection,
    handleChangeAddressSelection,
    sipAccounts,
    isSipAccountsLoading,
    selectedSip,
  } = useIntercomDataEditor({
    setFieldValue,
  });
  console.log(errors);
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <StyledSelect
          className={styles.typeSelect}
          label={t('editor.intercomType.label')}
          placeholder={t('editor.intercomType.placeholder')}
          isLoading={isTypeLoading}
          options={type}
          value={values.type}
          error={errors.type_id}
          onChange={handleChangeTypeSelection}
        />
        <TextField
          wrapperClassName={styles.editor}
          label={t('editor.ipAddress.label')}
          placeholder={t('editor.ipAddress.placeholder')}
          error={errors.ip_address}
          value={values.ip_address}
          onChange={(ev) => setFieldValue('ip_address', ev.target.value)}
        />
      </div>
      <TextField
        wrapperClassName={styles.editor}
        label={t('editor.rtspUrl.label')}
        placeholder={t('editor.rtspUrl.placeholder')}
        error={errors.rtsp_url}
        value={values.rtsp_url}
        onChange={(ev) => setFieldValue('rtsp_url', ev.target.value)}
      />
      <TextField
        wrapperClassName={styles.editor}
        label={t('editor.hlsUrl.label')}
        placeholder={t('editor.hlsUrl.placeholder')}
        error={errors.hls_url || errors.mp4_url}
        value={values.hls_url}
        onChange={(ev) => setFieldValue('hls_url', ev.target.value)}
      />
      <div className={styles.row}>
        <StyledSelect
          className={styles.phoneSelect}
          label={t('editor.phoneNumber.label')}
          placeholder={t('editor.phoneNumber.placeholder')}
          isLoading={isSipAccountsLoading}
          options={sipAccounts}
          value={values.sip_account}
          error={errors.sip_account_id}
          onChange={handleChangeSipSelection}
        />
        {selectedSip && (
          <SipData
            className={styles.sipData}
            password={selectedSip?.password}
            port={selectedSip?.sip_server.port}
            ip_address={selectedSip?.sip_server.ip_address}
          />
        )}
      </div>

      <AddressFilters
        className={styles.row}
        errors={{
          entrance: errors.entrance_id,
        }}
        initialValues={initialAddress}
        showLabel
        setFilters={handleChangeAddressSelection}
      />
    </div>
  );
};
