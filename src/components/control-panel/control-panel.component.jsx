import React from "react";
import "./control-panel.css";
import Timer from "../timer/timer.component";
import { GAMETIME } from "../../constants";

function ControlPanel(props) {
  const { gameStarted, selectedLevel, onGameStart, onLevelChange } = props;
  const handleTimer = (t) => {
    if (t === 0) onGameStart();
  };
  return (
    <section id="panel-control">
      <h3 className="sr-only">Escolha do Nível</h3>
      <form className="form">
        <fieldset className="form-group">
          <label htmlFor="btLevel">Nível:</label>
          <select id="btLevel" onChange={onLevelChange} disabled={gameStarted}>
            <option value="0">Seleccione...</option>
            <option value="1">Básico (9x9)</option>
            <option value="2">Intermédio (16x16)</option>
            <option value="3">Avançado (30x16)</option>
          </select>
        </fieldset>
        <button
          type="button"
          id="btPlay"
          disabled={selectedLevel === "0"}
          onClick={() => onGameStart()}
        >
          {!gameStarted ? "Iniciar Jogo" : "Terminar Jogo"}
        </button>
      </form>
      <div className="form-metadata">
        <p id="message" role="alert" className="hide">
          Clique em Iniciar o Jogo!
        </p>
        <dl className={`list-item left${gameStarted ? " gameStarted" : ""}`}>
          <dt>Tempo de Jogo:</dt>
          <dd id="gameTime">
            {gameStarted && (
              <Timer timeout={GAMETIME} onTimer={handleTimer} />
            )}
          </dd>
        </dl>
      </div>
    </section>
  );
}

export default ControlPanel;
