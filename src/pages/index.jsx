import React, { useState, useRef } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";

//components
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import VisNetwork from "../components/VisNetwork";
import Form from "../components/Form";
import RelationTable from "../components/RelationTable";
import Header from "../components/Header";
import SpinnerLoader from "../components/SpinnerLoader";
// hooks
import { useLocalStorage } from "../hooks/useLocalStorage";
import handleCustodyAccount from "../hooks/handleCustodyAccount";

// services
import custodyAccount from "../services/custodyAccount";

function App() {
  // arrays nodes
  const [state, setState] = useLocalStorage("state", {
    nodes: {},
    edges: {},
    data: {},
    showSummary: false,
  });
  const [loading, setLoading] = useState(false);

  const [, setImgPrint] = useState("");

  const [formEntity, setFormEntity] = useState({
    id: "",
  });
  const componentRef = useRef();

  const handleSubmitEntity = async () => {
    if (!state.data.length || state.data.Id !== formEntity.id) {
      try {
        setLoading(true);
        clearLocalStorage();
        const { data } = await custodyAccount.find(formEntity.id);
        const { nodes, edges } = await handleCustodyAccount(data);
        setState({
          ...state,
          nodes,
          edges,
          data,
        });
        setLoading(false);
      } catch (error) {
        clearLocalStorage();
        setLoading(false);
      }
    }
  };

  const clearLocalStorage = () => {
    setFormEntity({
      id: "",
    });
    setState({
      ...state,
      nodes: {},
      edges: {},
      data: {},
    });
  };

  const handleSummary = () => {
    setState({ ...state, showSummary: !state.showSummary });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <SpinnerLoader loading={loading} />
      <div className="flex items-center	p-3 sticky justify-between  bg-blue-50 mb-2">
        <Header />
        {state.showSummary && (
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
      {!state.showSummary && (
        <>
          <Form
            setFormEntity={setFormEntity}
            formEntity={formEntity}
            loading={loading}
            handleSubmitEntity={handleSubmitEntity}
            clearLocalStorage={clearLocalStorage}
            handleSummary={handleSummary}
          />
          {state.data?.custodyAccountDetail && (
            <Alert
              severity={
                state.data.custodyAccountDetail.Active ? "success" : "error"
              }
            >
              <AlertTitle> Estado de la Cuenta - {state.data.Id} </AlertTitle>
              Estatus:{" "}
              {state.data.custodyAccountDetail.Active ? "Active" : "Inactiva"}
            </Alert>
          )}

          <br />
          <RelationTable
            rows={state.edges}
            nodes={state.nodes}
            data={state.data?.custodyAccountDetail?.declarationControl}
          />
          <ReactToPrint content={() => componentRef.current} />
        </>
      )}

      {state.nodes.length > 0 && (
        <VisNetwork
          nodes={state.nodes}
          edges={state.edges}
          ref={componentRef}
          setImgPrint={setImgPrint}
        />
      )}
    </>
  );
}

export default App;
