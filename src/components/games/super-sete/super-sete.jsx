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
import './super-sete.sass';
import './super-sete-h.sass';
import './super-sete-v.sass';
import './super-sete-banner-h.sass';
import './super-sete-banner-v.sass';
import './super-sete-squared.sass';
import logo from '../../../images/mega-sena-branco.png';
import { screenFormat, BANNER_V } from '../../../util.js/screen';



const {
  fontRatio,
  scaledDensity,
  xdpi,
  ydpi,
  width,
  height,
} = config;

moment.locale('pt-BR');

// Create our number formatter.
var fmt = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

function SuperSete() {

  const title = screenFormat === BANNER_V ? 'SUPER SETE' : 'SUPER-SETE';

  const {
    result: {
      data: {
        supersete: {
          round: {
            number,
            numbers = [],
            prizes: {
              hits_7: {
                winners,
                amount,
              },
            },
            accumulated,
            city,
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
    winnersText = `Acumulou`;
    lastPrize = accumulated;
  }

  const nextDateUTC = moment.utc(nextDate);

  return (
    <div className={`${screenFormat} super-sete`}>
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
        <div className="numbers">
          <span>
            {numbers.slice(0, 3).map(number => <Ball key={number} value={number} />)}
          </span>
          <span>
            {numbers.slice(3).map(number => <Ball key={number} value={number} />)}
          </span>
        </div>
        <div className="result">
          <span className="winner">{winnersText}</span> (R$
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
        <div className="info">
          Concurso nº <strong>{number}</strong>, realizado em {moment(date).format('L')}. Local: {city}
        </div>
      </div>
      {/* <div className="spacer3" />
      <div className="special-prizes">
        Acumulado para Mega da Virada:
                <strong>
          &nbsp;
          R$
          &nbsp;
          <CountUp
            duration={5}
            start={0}
            end={accumulatedMegaVirada}
            decimals={2}
            separator="."
            decimal=","
          />
        </strong>
      </div> */}
    </div>
  );
}

export default SuperSete;