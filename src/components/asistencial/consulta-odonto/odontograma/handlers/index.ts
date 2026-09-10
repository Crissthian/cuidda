/**
 * Handlers de click para el Odontograma.
 * Exporta todos los handlers individuales y un registry para ejecutarlos.
 */

export type { ClickHandlerContext, ToothClickHandler } from './types'
export { generateHallazgoId, getCurrentDate } from './types'

// Handlers individuales
export { handleCrownClick } from './handleCrownClick'
export { handleEspigoMunonClick } from './handleEspigoMunonClick'
export { handleFractureClick } from './handleFractureClick'
export { handleFusionClick } from './handleFusionClick'
export { handleGeminationClick } from './handleGeminationClick'
export { handleGiroversionClick } from './handleGiroversionClick'
export { handlePiezaAusenteClick } from './handlePiezaAusenteClick'
export { handleDienteEnClavijaClick } from './handleDienteEnClavijaClick'
export { handlePiezaExtruidaClick } from './handlePiezaExtruidaClick'
export { handlePiezaErupcionClick } from './handlePiezaErupcionClick'
export { handleDiastemaClick } from './handleDiastemaClick'
export { handleApplianceClick } from './handleApplianceClick'
export { handlePiezaIntruidaClick } from './handlePiezaIntruidaClick'
export { handlePiezaSupernumerariaClick } from './handlePiezaSupernumerariaClick'
export { handlePulpotomiaClick } from './handlePulpotomiaClick'
export { handleProtesisFijaClick } from './handleProtesisFijaClick'
export { handleProtesisTotalClick } from './handleProtesisTotalClick'
export { handleProtesisRemovibleClick } from './handleProtesisRemovibleClick'
export { handleRestauracionClick } from './handleRestauracionClick'
export { handleRestauracionTemporalClick } from './handleRestauracionTemporalClick'
export { handleSellanteClick } from './handleSellanteClick'
export { handleSuperficieDesgastadaClick } from './handleSuperficieDesgastadaClick'
export { handleTratamientoConductoClick } from './handleTratamientoConductoClick'
export { handleTransposicionClick } from './handleTransposicionClick'
export { handleDefectosEsmalteClick } from './handleDefectosEsmalteClick'
export { handleFosasFisurasClick } from './handleFosasFisurasClick'
export { handleImpactacionClick } from './handleImpactacionClick'
export { handleImplanteClick } from './handleImplanteClick'
export { handleEctopicaClick } from './handleEctopicaClick'
export { handleMicrodonciaClick } from './handleMicrodonciaClick'
export { handleMovilidadClick } from './handleMovilidadClick'
export { handlePosicionAnormalDentariaClick } from './handlePosicionAnormalDentariaClick'

export { handleRemanenteRadicularClick } from './handleRemanenteRadicularClick'

import type { ClickHandlerContext, ToothClickHandler } from './types'
import { handleCrownClick } from './handleCrownClick'
import { handleEspigoMunonClick } from './handleEspigoMunonClick'
import { handleFractureClick } from './handleFractureClick'
import { handleFusionClick } from './handleFusionClick'
import { handleGeminationClick } from './handleGeminationClick'
import { handleGiroversionClick } from './handleGiroversionClick'
import { handlePiezaAusenteClick } from './handlePiezaAusenteClick'
import { handleDienteEnClavijaClick } from './handleDienteEnClavijaClick'
import { handlePiezaExtruidaClick } from './handlePiezaExtruidaClick'
import { handlePiezaIntruidaClick } from './handlePiezaIntruidaClick'
import { handlePiezaErupcionClick } from './handlePiezaErupcionClick'
import { handleDiastemaClick } from './handleDiastemaClick'
import { handleApplianceClick } from './handleApplianceClick'
import { handlePiezaSupernumerariaClick } from './handlePiezaSupernumerariaClick'
import { handlePulpotomiaClick } from './handlePulpotomiaClick'
import { handleProtesisFijaClick } from './handleProtesisFijaClick'
import { handleProtesisTotalClick } from './handleProtesisTotalClick'
import { handleProtesisRemovibleClick } from './handleProtesisRemovibleClick'
import { handleSellanteClick } from './handleSellanteClick'
import { handleTransposicionClick } from './handleTransposicionClick'
import { handleDefectosEsmalteClick } from './handleDefectosEsmalteClick'
import { handleFosasFisurasClick } from './handleFosasFisurasClick'
import { handleImpactacionClick } from './handleImpactacionClick'
import { handleImplanteClick } from './handleImplanteClick'
import { handleEctopicaClick } from './handleEctopicaClick'
import { handleMacrodonciaClick } from './handleMacrodonciaClick'
import { handleMicrodonciaClick } from './handleMicrodonciaClick'
import { handleMovilidadClick } from './handleMovilidadClick'
import { handlePosicionAnormalDentariaClick } from './handlePosicionAnormalDentariaClick'
import { handleRemanenteRadicularClick } from './handleRemanenteRadicularClick'

/**
 * Lista ordenada de handlers para procesar clicks.
 * El primer handler que retorne `true` detendrá la cadena.
 */
const handlers: ToothClickHandler[] = [
	handleCrownClick,
	handlePulpotomiaClick,
	handleEctopicaClick,
	handleMacrodonciaClick,
	handleMicrodonciaClick,
	handlePosicionAnormalDentariaClick,
	handleRemanenteRadicularClick,
	handleMovilidadClick,
	handleEspigoMunonClick,
	handleFractureClick,
	handleFusionClick,
	handleGeminationClick,
	handleGiroversionClick,
	handlePiezaAusenteClick,
	handleDienteEnClavijaClick,
	handlePiezaExtruidaClick,
	handlePiezaIntruidaClick,
	handlePiezaSupernumerariaClick,
	handlePiezaErupcionClick,
	handleDiastemaClick,
	handleApplianceClick,
	handleProtesisFijaClick,
	handleProtesisTotalClick,
	handleProtesisRemovibleClick,
	handleTransposicionClick,
	handleSellanteClick,
	handleDefectosEsmalteClick,
	handleFosasFisurasClick,
	handleImpactacionClick,
	handleImplanteClick
]

/**
 * Procesa un click en un diente ejecutando los handlers en orden.
 * Se detiene cuando un handler retorna `true` (indicando que manejó el click).
 *
 * @param ctx - Contexto con toda la información necesaria para los handlers
 * @returns true si algún handler procesó el click, false si ninguno lo hizo
 */
export function processToothClick(ctx: ClickHandlerContext): boolean {
	for (const handler of handlers) {
		if (handler(ctx)) {
			return true
		}
	}
	return false
}
