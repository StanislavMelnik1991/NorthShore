import classNames from 'classnames';
import { HeatingSchema } from '@entities/components';
import { HeatingParametersType } from '@entities/types';
import { Badge, Dot } from '@shared/ui';
import styles from './Schema.module.scss';

interface Props {
  className?: string;
  parameters?: HeatingParametersType;
}

export const HeatingSchemaWidget = ({ className, parameters }: Props) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <HeatingSchema className={styles.schema} />
      {/* temperature start */}
      <Badge
        color="green"
        className={classNames(styles.badge, styles.t_gvs_contour_1)}
      >{`t=${parameters?.t_gvs_contour_1}℃`}</Badge>
      <Badge
        color="green"
        className={classNames(styles.badge, styles.t_supplied)}
      >{`t=${parameters?.t_supplied}℃`}</Badge>
      <Badge
        color="green"
        className={classNames(styles.badge, styles.t_reverse)}
      >{`t=${parameters?.t_reverse}℃`}</Badge>
      <Badge
        color="green"
        className={classNames(styles.badge, styles.t_gvs_contour_2)}
      >{`t=${parameters?.t_gvs_contour_2}℃`}</Badge>
      <Badge
        color="green"
        className={classNames(styles.badge, styles.t_gvs_reverse_contour_2)}
      >{`t=${parameters?.t_gvs_reverse_contour_2}℃`}</Badge>
      <Badge
        color="green"
        className={classNames(styles.badge, styles.t_gvs_reverse_contour_1)}
      >{`t=${parameters?.t_gvs_reverse_contour_1}℃`}</Badge>
      {/* temperature end */}

      {/* pressure start */}
      <Badge
        color="violet"
        className={classNames(styles.badge, styles.p_contour_1_0)}
      >{`P=${parameters?.p_contour_1_0}МПа`}</Badge>
      <Badge
        color="violet"
        className={classNames(styles.badge, styles.p_contour_2)}
      >{`P=${parameters?.p_contour_2}МПа`}</Badge>
      <Badge
        color="violet"
        className={classNames(styles.badge, styles.p_contour_1_1)}
      >{`P=${parameters?.p_contour_1_1}МПа`}</Badge>
      <Badge
        color="violet"
        className={classNames(styles.badge, styles.p_contour_1_2)}
      >{`P=${parameters?.p_contour_1_2}МПа`}</Badge>

      <Badge
        color="dark"
        className={classNames(styles.badge, styles.p_delta_contour_2)}
      >{`${parameters?.p_delta_contour_2}МПа`}</Badge>
      <Badge
        color="dark"
        className={classNames(styles.badge, styles.p_delta_contour_1_0)}
      >{`${parameters?.p_delta_contour_1_0}МПа`}</Badge>
      <Badge
        color="dark"
        className={classNames(styles.badge, styles.p_delta_contour_1_1)}
      >{`${parameters?.p_delta_contour_1_1}МПа`}</Badge>
      {/* pressure end */}

      {/* valve start */}
      <Badge
        color="dark"
        className={classNames(styles.badge, styles.offset_valve_contour_1)}
      >{`${parameters?.offset_valve_contour_1}%`}</Badge>
      <Badge
        color="dark"
        className={classNames(styles.badge, styles.offset_valve_contour_2)}
      >{`${parameters?.offset_valve_contour_2}%`}</Badge>
      {/* valve end */}

      {/* is_pomp_open start */}
      <Badge
        color="white"
        className={classNames(styles.badge, styles.is_pump_open_contour_2)}
      >
        <Dot color={parameters?.is_pump_open_contour_2 ? 'green' : 'red'} />
        {parameters?.is_pump_open_contour_2 ? 'Вкл' : 'Выкл'}
      </Badge>
      <Badge
        color="white"
        className={classNames(
          styles.badge,
          styles.is_pump_open_contour_2_helper,
        )}
      >
        <Dot
          color={parameters?.is_pump_open_contour_2_helper ? 'green' : 'red'}
        />
        {parameters?.is_pump_open_contour_2_helper ? 'Вкл' : 'Выкл'}
      </Badge>
      <Badge
        color="white"
        className={classNames(styles.badge, styles.is_pump_open_contour_1)}
      >
        <Dot color={parameters?.is_pump_open_contour_1 ? 'green' : 'red'} />
        {parameters?.is_pump_open_contour_1 ? 'Вкл' : 'Выкл'}
      </Badge>
      <Badge
        color="white"
        className={classNames(
          styles.badge,
          styles.is_pump_open_contour_1_helper,
        )}
      >
        <Dot
          color={parameters?.is_pump_open_contour_1_helper ? 'green' : 'red'}
        />
        {parameters?.is_pump_open_contour_1_helper ? 'Вкл' : 'Выкл'}
      </Badge>
      <Badge
        color="white"
        className={classNames(styles.badge, styles.is_pump_open_contour_1_1)}
      >
        <Dot color={parameters?.is_pump_open_contour_1_1 ? 'green' : 'red'} />
        {parameters?.is_pump_open_contour_1_1 ? 'Вкл' : 'Выкл'}
      </Badge>
      <Badge
        color="white"
        className={classNames(
          styles.badge,
          styles.is_pump_open_contour_1_1_helper,
        )}
      >
        <Dot
          color={parameters?.is_pump_open_contour_1_1_helper ? 'green' : 'red'}
        />
        {parameters?.is_pump_open_contour_1_1_helper ? 'Вкл' : 'Выкл'}
      </Badge>
      {/* is_pomp_open end */}
      {/* pomp_work_time start */}
      <Badge
        color="blue"
        className={classNames(styles.badge, styles.work_time_pomp_2)}
      >{`${parameters?.work_time_pomp_2}ч`}</Badge>

      <Badge
        color="blue"
        className={classNames(styles.badge, styles.work_time_pomp_2_helper)}
      >{`${parameters?.work_time_pomp_2_helper}ч`}</Badge>
      {/* pomp_work_time end */}
      <Badge
        color="white"
        className={classNames(styles.badge, styles.is_relay_open)}
      >
        <Dot color={parameters?.is_relay_open ? 'green' : 'red'} />
        {parameters?.is_relay_open ? 'Откр' : 'Закр'}
      </Badge>
    </div>
  );
};
