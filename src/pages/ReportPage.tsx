import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "../components/molecules/Card";

const dataTopProducts = [
  { name: "Roble", value: 101990 },
  { name: "Pino", value: 70590 },
  { name: "Cedro", value: 66400 },
  { name: "Caoba", value: 64800 },
  { name: "Nogal", value: 64380 },
];

const dataStockVsSales = [
  { year: 2005, value: 100 },
  { year: 2006, value: 300 },
  { year: 2007, value: 320 },
  { year: 2008, value: 400 },
];

const dataAlmacen = [
  { name: "Almacén A", value: 33.3 },
  { name: "Almacén B", value: 33.3 },
  { name: "Almacén C", value: 33.4 },
];

const dataProveedor = [
  { name: "Proveedor X", value: 37.7 },
  { name: "Proveedor Y", value: 33.3 },
  { name: "Proveedor Z", value: 29 },
];

const dataTransformacionRoble = [
  {
    semana: "Semana 1",
    Tronco: 10,
    "Tablón húmedo": 15,
    "Tablón en horno": 20,
    "Tablón seco": 12,
  },
  {
    semana: "Semana 2",
    Tronco: 15,
    "Tablón húmedo": 18,
    "Tablón en horno": 22,
    "Tablón seco": 25,
  },
  {
    semana: "Semana 3",
    Tronco: 5,
    "Tablón húmedo": 10,
    "Tablón en horno": 13,
    "Tablón seco": 9,
  },
  {
    semana: "Semana 4",
    Tronco: 20,
    "Tablón húmedo": 17,
    "Tablón en horno": 21,
    "Tablón seco": 26,
  },
];

const COLORS = ["#FF8042", "#FFBB28", "#FF6384", "#FF6384"]; // Pie colors

export default function Dashboard() {
  return (
    <div className="p-4 grid grid-cols-12 gap-4">
      <div className="col-span-12 text-2xl font-bold">
        Resumen de actividades del inventario (Mensual)
      </div>

      <Card className="col-span-2">
        <CardContent className="p-4">
          <p>Proveedores</p>
          <p className="text-2xl font-bold">29</p>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardContent className="p-4">
          <p>Existencias</p>
          <p className="text-2xl font-bold">4,569 Unidades</p>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardContent className="p-4">
          <p>Ventas</p>
          <p className="text-2xl font-bold">20.654 Bs</p>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardContent>
          <p className="font-semibold">Distribución de Unidades por Lugar</p>
          <PieChart width={200} height={200}>
            <Pie
              data={dataAlmacen}
              cx={100}
              cy={100}
              outerRadius={70}
              dataKey="value"
              label
            >
              {dataAlmacen.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardContent>
          <p className="font-semibold">Distribución de Unidades por Proveedor</p>
          <PieChart width={200} height={200}>
            <Pie
              data={dataProveedor}
              cx={100}
              cy={100}
              outerRadius={70}
              dataKey="value"
              label
            >
              {dataProveedor.map((entry, index) => (
                <Cell key={`cell-p-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </CardContent>
      </Card>

      <Card className="col-span-6">
        <CardContent>
          <p className="font-semibold">Productos de Madera Más Vendidos</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataTopProducts} layout="vertical">
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-6">
        <CardContent>
          <p className="font-semibold">Inventario Semanal por Etapa de Transformación - Roble</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataTransformacionRoble}>
              <XAxis dataKey="semana" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Tronco" stackId="a" fill="#FF8042" />
              <Bar dataKey="Tablón húmedo" stackId="a" fill="#FFBB28" />
              <Bar dataKey="Tablón en horno" stackId="a" fill="#FF6384" />
              <Bar dataKey="Tablón seco" stackId="a" fill="#d946ef" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-6">
        <CardContent>
          <p className="font-semibold">Unidades de Stock Actual vs Vendidos</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dataStockVsSales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
