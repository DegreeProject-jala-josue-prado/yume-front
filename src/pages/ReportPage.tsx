import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend, ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "../components/molecules/Card";
import DetailsModal from "../components/organisms/DetailsModal";

// --- Tus datos (sin cambios) ---
const dataTopProducts = [ { name: "Roble", value: 101990 }, { name: "Pino", value: 70590 }, { name: "Cedro", value: 66400 }];
const dataStockVsSales = [ { year2: 2005, year: 100 }, { year2: 2006, year: 300 }, { year2: 2007, year: 320 }];
const dataAlmacen = [ { name: "Almacén A", value: 33.3 }, { name: "Almacén B", value: 33.3 }, { name: "Almacén C", value: 33.4 }];
const dataProveedor = [ { name: "Proveedor X", value: 37.7 }, { name: "Proveedor Y", value: 33.3 }, { name: "Proveedor Z", value: 29 }];
const dataTransformacionRoble = [
  { semana: "Semana 1", Tronco: 10, "Tablón húmedo": 15, "Tablón en horno": 20, "Tablón seco": 12, },
  { semana: "Semana 2", Tronco: 15, "Tablón húmedo": 18, "Tablón en horno": 22, "Tablón seco": 25, },
  { semana: "Semana 3", Tronco: 5, "Tablón húmedo": 10, "Tablón en horno": 13, "Tablón seco": 9, },
  { semana: "Semana 4", Tronco: 20, "Tablón húmedo": 17, "Tablón en horno": 21, "Tablón seco": 26, },
];
const COLORS_PIE = ["#FF8042", "#FFBB28", "#0088FE"];
const COLORS_BARS = ["#8884d8", "#82ca9d", "#ffc658"];

// --- Datos de ejemplo para los detalles ---
const dummyDetails = {
  'Almacén A': ['Sector 1: 500 unidades', 'Sector 2: 350 unidades'],
  'Proveedor X': ['Compra #1: 1500 Bs', 'Compra #2: 2300 Bs'],
  'Roble': ['Ventas Totales: 101,990 Bs', 'Unidades en Stock: 250', 'Última Compra: 2023-10-15'],
};

export default function ReportPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', data: null as any, type: 'text' as 'list' | 'chart' | 'text' });

  const openModal = (title: string, data: any, type: 'list' | 'chart' | 'text') => {
    setModalContent({ title, data, type });
    setIsModalOpen(true);
  };

  const handleWeeklyBarClick = (data: any) => {
    if (data?.activePayload?.[0]?.payload) {
      const weekData = data.activePayload[0].payload;
      openModal(`Desglose de la ${weekData.semana}`, weekData, 'chart'); // <-- ¡Mostramos un gráfico!
    }
  };

  const handlePieSliceClick = (data: any) => {
    openModal(`Detalles de ${data.name}`, dummyDetails[data.name as keyof typeof dummyDetails] || ['No hay detalles'], 'list');
  };

  const handleTopProductClick = (data: any) => {
    if (data?.activePayload?.[0]?.payload) {
      const productData = data.activePayload[0].payload;
      openModal(`Detalles de ${productData.name}`, dummyDetails[productData.name as keyof typeof dummyDetails] || ['No hay detalles'], 'list');
    }
  };

  return (
    <>
      <div className="p-4 grid grid-cols-12 gap-4">
        {/* ... Títulos y tarjetas de resumen ... */}
        <div className="col-span-12 text-2xl font-bold">Resumen de actividades</div>
        <Card className="col-span-2"><CardContent className="p-4"><p>Proveedores</p><p className="text-2xl font-bold">29</p></CardContent></Card>
        <Card className="col-span-2"><CardContent className="p-4"><p>Existencias</p><p className="text-2xl font-bold">4,569</p></CardContent></Card>
        <Card className="col-span-2"><CardContent className="p-4"><p>Ventas</p><p className="text-2xl font-bold">20.654 Bs</p></CardContent></Card>


        {/* GRÁFICOS DE TORTA INTERACTIVOS */}
        <Card className="col-span-3">
          <CardContent>
            <p className="font-semibold">Unidades por Lugar</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={dataAlmacen} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} onClick={handlePieSliceClick} cursor="pointer">
                  {dataAlmacen.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS_PIE[index % COLORS_PIE.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardContent>
            <p className="font-semibold">Unidades por Proveedor</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={dataProveedor} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} onClick={handlePieSliceClick} cursor="pointer">
                  {dataProveedor.map((entry, index) => <Cell key={`cell-p-${index}`} fill={COLORS_PIE[index % COLORS_PIE.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* GRÁFICO DE BARRAS VERTICAL INTERACTIVO */}
        <Card className="col-span-6">
          <CardContent>
            <p className="font-semibold">Productos Más Vendidos</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dataTopProducts} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }} onClick={handleTopProductClick}>
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={60} />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" cursor="pointer">
                  {dataTopProducts.map((entry, index) => <Cell key={`cell-bar-${index}`} fill={COLORS_BARS[index % COLORS_BARS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* GRÁFICO DE TRANSFORMACIÓN SEMANAL INTERACTIVO */}
        <Card className="col-span-6">
          <CardContent>
            <p className="font-semibold">Inventario por Etapa de Transformación</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dataTransformacionRoble} onClick={handleWeeklyBarClick}>
                <XAxis dataKey="semana" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Tronco" stackId="a" fill="#FF8042" cursor="pointer" />
                <Bar dataKey="Tablón húmedo" stackId="a" fill="#FFBB28" cursor="pointer" />
                <Bar dataKey="Tablón en horno" stackId="a" fill="#FF6384" cursor="pointer" />
                <Bar dataKey="Tablón seco" stackId="a" fill="#d946ef" cursor="pointer" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* GRÁFICO DE LÍNEAS (NO INTERACTIVO EN ESTE EJEMPLO) */}
        <Card className="col-span-6">
          <CardContent>
            <p className="font-semibold">Stock vs Vendidos</p>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dataStockVsSales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year2" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="year" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <DetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} {...modalContent} />
    </>
  );
}