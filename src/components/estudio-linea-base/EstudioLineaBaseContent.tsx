import AntecedentesOrganizacion from "@/components/estudio-linea-base/AntecedentesOrganizacion";
import FichaEmpresa from "@/components/estudio-linea-base/FichaEmpresa";
import InformacionSensible from "@/components/estudio-linea-base/InformacionSensible";
import ObjetivosSistema from "@/components/estudio-linea-base/ObjetivosSistema";
import SedesProcesos from "@/components/estudio-linea-base/SedesProcesos";
import ValidacionCruzada from "@/components/estudio-linea-base/ValidacionCruzada";

export default function EstudioLineaBaseContent() {
  return (
    <div className="flex flex-col gap-5 text-xs">
      <div className="p-0.5">
        <div className="grid grid-cols-2 gap-6 pb-6">
          <FichaEmpresa />
          <InformacionSensible />
        </div>

        <div className="grid grid-cols-2 gap-6 pb-6">
          <AntecedentesOrganizacion />
          <ValidacionCruzada />
        </div>

        <div className="grid grid-cols-2 gap-6 pb-4 mb-4">
          <ObjetivosSistema />
          <SedesProcesos />
        </div>
      </div>
    </div>
  );
}
