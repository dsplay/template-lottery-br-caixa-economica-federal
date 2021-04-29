import React from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import CountUp from 'react-countup';
import {
  media, // current media
  config, // player configuration
  template, // custom template values
} from '@dsplay/template-utils';
import Ball from '../../ball';
import './time-mania.sass';
import './time-mania-h.sass';
import './time-mania-v.sass';
import './time-mania-banner-h.sass';
import './time-mania-banner-v.sass';
import './time-mania-squared.sass';
import logo from '../../../images/time-mania-branco.png';
import { screenFormat, BANNER_H, BANNER_V } from '../../../util.js/screen';



moment.locale('pt-BR');

// Create our number formatter.
var fmt = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

function TimeMania() {

  const title = 'TIME MANIA';

  const {
    result: {
      data: {
        timemania: {
          round: {
            number,
            numbers = [],
            prizes: {
              hits_7: {
                winners,
                amount,
              },
              heart_club: {
                club,
              },
            },
            accumulated,
            city,
            place,
            date,
          },
          next: {
            date: nextDate,
            estimatedPrize,
          },
        },
      },
    },
  } = media;

  let lastPrize;
  let winnersText;

  if (winners > 0) {
    winnersText = `${winners} ganhador${winners === 1 ? '' : 'es'}`;
    lastPrize = amount;
  } else {
    winnersText = `ACUMULOU`;
    lastPrize = accumulated;
  }

  const nextDateUTC = moment.utc(nextDate);

  return (
    <div className={`${screenFormat} time-mania`}>
      <div className="header">
        <div className="logo">
          <img src={logo} />
          <span>{title}</span>
        </div>
      </div>

      <div className="spacer1" />

      <div className="next-round flex v">
        <div className="text">
          <div className="title">Próximo Prêmio</div>
          <div className="date">{nextDateUTC.format('dddd')}, {nextDateUTC.format('LL')}</div>
        </div>
        <div className="estimated-prize flex h">
          <span className="currency-symbol">R$ </span>
          <span className="value-container">
            <span className="value">
              <CountUp
                start={0}
                duration={2}
                end={estimatedPrize}
                decimals={2}
                separator="."
                decimal=","
              />
            </span>
          </span>
        </div>
      </div>
      <div className="spacer2" />

      <div className="last-round flex v">
        <div className="title">Último Resultado</div>
        <div className="results">
          <div className="numbers">
            <span>
              {numbers.slice(0, 4).map(number => <Ball key={number} value={number} />)}
            </span>
            <span>
              {numbers.slice(4).map(number => <Ball key={number} value={number} />)}
            </span>
          </div>
          <div>
            <div className="extra-result">
              <span className="label">Time do Coração: ♥</span>
              <span className="value">{club}</span>
            </div>
            <div className="result">
              <span className="winner">{winnersText}</span>
                            &nbsp;(R$&nbsp;
                            <CountUp
                duration={3}
                start={0}
                end={lastPrize}
                decimals={2}
                separator="."
                decimal=","
              />
                            )
                        </div>
          </div>
        </div>
        <div className="info">
          Concurso nº <strong>{number}</strong>, realizado em {moment(date).format('L')}. Local: {place}, {city}
        </div>
      </div>
      <div className="spacer3" />
      <div className="special-prizes">
      </div>
    </div>
  );
}

export default TimeMania;