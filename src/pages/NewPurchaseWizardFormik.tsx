import { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

const DIMENSION_BATCH_SIZE = 20;

const initialValues = {
  species: "",
  woodState: "",
  supplierName: "",
  location: "",
  extractor: "",
  entryDate: "",
  driverName: "",
  plateNumber: "",
  vehicleBrand: "",
  cefoNumber: "",
  unitPrice: "",
  dimensions: [],
};

const validationSchema = Yup.object({
  species: Yup.string().required("Campo requerido"),
  woodState: Yup.string().required("Campo requerido"),
});

export default function NewPurchaseWizardFormik() {
  const [step, setStep] = useState(1);
  const [dimensionsCount, setDimensionsCount] = useState(DIMENSION_BATCH_SIZE);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleAddMore = (push) => {
    for (let i = 0; i < DIMENSION_BATCH_SIZE; i++) {
      push({ diameter: "", length: "" });
    }
    setDimensionsCount(dimensionsCount + DIMENSION_BATCH_SIZE);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log("Formulario enviado:", values)}
    >
      {({ values, }) => (
        <Form className="space-y-6 p-6 max-w-4xl mx-auto bg-white rounded shadow-md">
          {step === 1 && (
            <>
              <h2 className="text-xl font-bold">Paso 1: Datos Generales</h2>
              <div>
                <label>Especie de Madera</label>
                <Field name="species" as="select" className="input">
                  <option value="">Seleccione</option>
                  <option value="roble">Roble</option>
                  <option value="pino">Pino</option>
                </Field>
              </div>
              <div>
                <label>Estado</label>
                <div className="space-x-4">
                  <label>
                    <Field type="radio" name="woodState" value="tronca" /> Tronca
                  </label>
                  <label>
                    <Field type="radio" name="woodState" value="seca" /> Seca / Tablones
                  </label>
                </div>
              </div>

              {/* Agrega más campos aquí para proveedor y transporte */}

              <div className="flex justify-end space-x-2">
                <button type="button" onClick={handleNext} className="btn">Siguiente</button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl font-bold">Paso 2: Dimensiones ({values.dimensions.length})</h2>
              <FieldArray name="dimensions">
                {({ push, }) => (
                  <>
                    {values.dimensions.map((dim, index) => (
                      <div key={index} className="grid grid-cols-2 gap-4 mb-2">
                        <Field name={`dimensions[${index}].diameter`} type="number" placeholder="Diámetro" className="input" />
                        <Field name={`dimensions[${index}].length`} type="number" placeholder="Largo" className="input" />
                      </div>
                    ))}
                    {values.dimensions.length < 300 && (
                      <button type="button" onClick={() => handleAddMore(push)} className="text-blue-500">
                        + Agregar 20 más
                      </button>
                    )}
                  </>
                )}
              </FieldArray>

              <div className="flex justify-between mt-6">
                <button type="button" onClick={handleBack} className="btn">Volver</button>
                <button type="submit" className="btn-primary">Guardar Compra</button>
              </div>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
}
