import React, { useState, useRef } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";

//components
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import VisNetwork from "../components/VisNetwork";
import BasicTable from "../components/BasicTable";
import Form from "../components/Form";
import RelationTable from "../components/RelationTable";
import Header from "../components/Header";
// hooks
import { useLocalStorage } from "../hooks/useLocalStorage";
// utils
import { assets } from "../config/img/assets-storage";
// services
import custodyAccount from "../services/custodyAccount";

function App() {
  // arrays nodes
  const [state, setState] = useLocalStorage("state", {});
  const [nodes, setNodes] = useLocalStorage("nodes", []);
  const [edges, setEdges] = useLocalStorage("edges", []);
  const [dataRecords, setDataRecords] = useLocalStorage("data", null);
  const [loading, setLoading] = useState(false);
  const [showSummary, setShowSummary] = useLocalStorage("showSummary", true);
  const [, setImgPrint] = useState("");

  const componentRef = useRef();
  // Fields for add new entity or nodes
  const [formEntity, setFormEntity] = useState({
    id: "",
    entity: "",
    color: "",
    type: "",
  });
  const handleSubmitEntity = async () => {
    if (!dataRecords || dataRecords.Id !== formEntity.id) {
      try {
        setLoading(true);
        const { data } = await custodyAccount.find(formEntity.id);
        setDataRecords(data);
        const accountCustody = {
          label: `${data.custodian.name} - ${data.Name}`,
          id: data.Id,
          shape: "image",
          image: {
            selected: data.custodian.custodianDetail?.url_logo,
            unselected: assets.public.svg.iconTest,
          },
        };
        const listDeclarationsControl = [];
        const listEdges = [];

        data.custodyAccountDetail.declarationControl.forEach((item) => {
          var newNode = item.naturalPerson
            ? prepareNodeTypeNaturalPerson(item.naturalPerson)
            : prepareNodeTypeLegalPerson(item.legalPerson);
          var newEdges = prepareEdges(item);

          listDeclarationsControl.push(newNode);

          newNode = null;
          if (newEdges) listEdges.push(newEdges);
        });
        setEdges(listEdges);
        setNodes([...listDeclarationsControl, accountCustody]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };
  const prepareNodeTypeNaturalPerson = ({
    id_natural_person: id,
    first_name,
    last_name,
  }) => {
    return {
      label: `${first_name} ${last_name}`,
      id,
      shape: "icon",
      group: "users",
    };
  };
  const prepareNodeTypeLegalPerson = ({ name: label, ID: id }) => {
    return {
      label,
      id,
      shape: "icon",
      group: "company",
    };
  };
  const prepareEdges = ({ IDCA, details, IDNP, IDLP }) => {
    if (details)
      return {
        to: IDCA,
        from: IDNP || IDLP,
        label: details.lookup.valueString,
        font: { align: "horizontal" },
        arrows: "to",
        length: 100,
      };
  };
  const clearLocalStorage = () => {
    setState([]);
    setNodes([]);
    setEdges([]);
    setDataRecords(null);
  };
  const handleSummary = () => {
    setShowSummary(!showSummary);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="flex items-center	p-3 sticky justify-between  bg-blue-50 mb-2">
        <Header />
        {!showSummary && (
          <>
            <div className="group-buttons-previous-and-print">
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={handleSummary}
              >
                {" "}
                ATRAS{" "}
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={handlePrint}
              >
                IMPRIMIR
              </Button>
            </div>
          </>
        )}
      </div>
      {showSummary && (
        <>
          <Form
            setFormEntity={setFormEntity}
            formEntity={formEntity}
            loading={loading}
            handleSubmitEntity={handleSubmitEntity}
            clearLocalStorage={clearLocalStorage}
            handleSummary={handleSummary}
          />
          {dataRecords && (
            <Alert
              severity={
                dataRecords.custodyAccountDetail.Active ? "success" : "error"
              }
            >
              <AlertTitle> Estado de la Cuenta - {dataRecords.Id} </AlertTitle>
              Estatus:{" "}
              {dataRecords.custodyAccountDetail.Active ? "Active" : "Inactiva"}
            </Alert>
          )}

          <BasicTable rows={state} />
          <br />
          <RelationTable rows={edges} nodes={nodes} />
          <ReactToPrint content={() => componentRef.current} />
        </>
      )}

      {nodes.length > 0 && (
        <VisNetwork
          nodes={nodes}
          edges={edges}
          ref={componentRef}
          setImgPrint={setImgPrint}
        />
      )}
    </>
  );
}

export default App;
