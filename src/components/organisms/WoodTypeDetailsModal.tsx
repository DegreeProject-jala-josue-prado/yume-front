import { WoodType } from '../../types/WoodType';
import Button from '../atoms/Button';

interface WoodTypeDetailsModalProps {
  onClose: () => void;
  woodType: WoodType; // Recibe el objeto completo para mostrar
}

// Componente pequeño y reutilizable para mostrar un par clave-valor
const DetailItem = ({ label, value }: { label: string; value: string | undefined }) => (
  <div>
    <h4 className="text-sm font-semibold text-gray-500">{label}</h4>
    <p className="text-md text-gray-800">{value || 'N/A'}</p>
  </div>
);

const WoodTypeDetailsModal = ({ onClose, woodType }: WoodTypeDetailsModalProps) => {
  if (!woodType) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-2xl font-bold text-gray-800">{woodType.commonName}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
        </div>
        
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-4">
          
          {/* Sección de Información General */}
          <fieldset className="border p-4 rounded-md">
            <legend className="text-lg font-semibold px-2 text-gray-700">Información General</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-2">
              <DetailItem label="Nombre Científico" value={woodType.scientificName} />
              <DetailItem label="Familia Botánica" value={woodType.technicalSheet.family} />
              <DetailItem label="Origen Geográfico" value={woodType.technicalSheet.origin} />
            </div>
          </fieldset>

          {/* Sección de Apariencia */}
          <fieldset className="border p-4 rounded-md">
            <legend className="text-lg font-semibold px-2 text-gray-700">Apariencia</legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 mt-2">
              <DetailItem label="Color" value={woodType.technicalSheet.color} />
              <DetailItem label="Veta" value={woodType.technicalSheet.grain} />
              <DetailItem label="Textura" value={woodType.technicalSheet.texture} />
            </div>
          </fieldset>
          
        </div>

        <div className="flex justify-end mt-8 pt-4 border-t">
          <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WoodTypeDetailsModal;