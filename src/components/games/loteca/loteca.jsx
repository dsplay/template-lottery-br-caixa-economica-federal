import React from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import CountUp from 'react-countup';
import {
  media, // current media
  config, // player configuration
  template, // custom template values
} from '@dsplay/template-utils';

import Logo from '../../logo';
import Match from '../../match';

import './loteca.sass';
import './loteca-h.sass';
import './loteca-v.sass';
import './loteca-banner-h.sass';
import './loteca-banner-v.sass';
import './loteca-squared.sass';
import { screenFormat, BANNER_H, BANNER_V } from '../../../util.js/screen';



moment.locale('pt-BR');

// Create our number formatter.
var fmt = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

function Loteca() {

  const title = 'LOTECA';

  const {
    result: {
      data: {
        loteca: {
          round: {
            number,
            matches,
            prizes: {
              hits_14: {
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
          accumulatedIndependenceDaySpecialPrize: nextSpecialPrizeAccumulated,
        },
      },
    },
  } = media;

  console.log(media);

  let lastPrize;
  let winnersText;

  if (winners > 0) {
    winnersText = `${winners} ganhador${winners === 1 ? '' : 'es'}`;
    lastPrize = amount;
  } else {
    winnersText = `Não houve ganhadores`;
    lastPrize = accumulated;
  }

  const nextDateUTC = moment.utc(nextDate);

  return (
    <div className={`${screenFormat} loteca`}>
      <div className="header">
        <div className="logo">
          <Logo primaryColor="#FFF" secondColor="#fc8e7f"/>
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
        <div style={{ display: 'flex' }}>
          <div>
            {matches.slice(0, 4).map(match => <Match match={match} /> )}
          </div>
          <div>
            {matches.slice(4, 8).map(match => <Match match={match} /> )}
          </div>
          <div>
            {matches.slice(8, 12).map(match => <Match match={match} /> )}
          </div>
          <div>
            {matches.slice(12, 14).map(match => <Match match={match} /> )}
          </div>
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
    </div>
  );
}

export default Loteca;