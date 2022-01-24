import React, { useState } from "react";
//components
import VisNetwork from "./components/VisNetwork";
import BasicTable from "./components/BasicTable";
import Form from "./components/Form";
import Relationship from "./components/Relationship";
import RelationTable from "./components/RelationTable";
import { useLocalStorage } from "../src/hooks/useLocalStorage";
import { listEntity } from "./data";
function App() {
  // arrays nodes
  const [state, setState] = useLocalStorage("state", []);
  const [nodes, setNodes] = useLocalStorage("nodes", []);
  const [edges, setEdges] = useLocalStorage("edges", []);

  const [formEntity, setFormEntity] = useState({
    id: "",
    entity: "",
    color: "",
    type: "",
  });

  const [fieldsEgdes, setFieldsEgdes] = useState({
    to: "",
    from: "",
    label: "es accionista de",
    font: { align: "middle" },
    arrows: "to",
  });

  const validation = () => {
    if (state.find((e) => e.id === formEntity.id)) return false;
    else return true;
  };
  const handleSubmitEntity = () => {
    if (validation() && formEntity.id && formEntity.entity) {
      //add nodes array
      setState([...state, formEntity]);
      // created node
      prepareNodes(formEntity);
      //clear inputs
      setFormEntity({
        id: "",
        entity: "",
        color: "",
        type: "",
      });
    } else alert(`Ah Ocurrido un error `);
  };
  const validateEdges = () => {
    const { to, from, label } = fieldsEgdes;
    const value = edges.find(
      (e) => e.to === to && e.from === from && e.label === label
    );

    return value ? true : false;
  };
  const handleAddEgdes = () => {
    //add edges array
    const { to, from, label } = fieldsEgdes;
    validateEdges();
    if (to && from && label) {
      setEdges([...edges, fieldsEgdes]);
      // clear input
      setFieldsEgdes({
        to: "",
        from: "",
        label: "",
        font: { align: "middle" },
        arrows: "to",
      });
    }
  };
  const prepareNodes = (node) => {
    setNodes([
      {
        id: parseInt(node.id),
        label: node.entity,
        shape: "icon",
        icon: {
          face: "'FontAwesome'",
          code: listEntity.find((e) => e.id === node.type)?.icon,
          size: 50,
          color: node.color,
        },
      },
      ...nodes,
    ]);
  };
  const clearLocalstorage = () => {
    setState([]);
    setNodes([]);
    setEdges([]);
  };
  return (
    <>
      <img
        className="logo"
        alt="logo-company"
        src="https://upwork-usw2-prod-file-storage-wp3.s3.us-west-2.amazonaws.com/workplace/attachment/6526a9c8a4d9ecb83be694fdba3a114c?response-content-disposition=inline%3B%20filename%3D%22Firmus-Octogone-%2528Medium%2529.png%22%3B%20filename%2A%3Dutf-8%27%27Firmus-Octogone-%2528Medium%2529.png&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQDYoHIEekNSQLuoJz8M%2BI55TAbNBJ2KrRI9p0fJyjMTWQIhAOt9GrGC%2FFT9BncAb7CVuxsObllrx1Hcq9V31YPSptd5Ks0ECGUQABoMNzM5OTM5MTczODE5IgyJCGGyLo1KoTLpS3UqqgQpXp2bEnF9nCzVBwC5Aeqv1Qa%2BybZ7xirThvWhndvM57Q7PE%2F0g11q6v2qfLVEvxohTuzUedviNANCqjW5rrKOa%2F%2FWE04bqnhiM6tFc7xbQsI3jVsNxA5gZOG3ogo6J0lyWPZ1KiUwbdm9EjvtFMPMlZiQpIFQK7kyweuYiW%2Fj4t35OinTOUXHbmtuGRaiFkR2gIcF%2Bf72uL%2Bk7NoX3n5yUEnUMnabS0cANtLXSqvturqQ7sKXKAzNQ7qK5x9yVnWegtTGCzGZJsVNjLnMekOfPuAlebOURGFBlPqc5Z3ZlmRlkId%2BoiF%2BCy5Yb5zc2mOp4TgpmoFU1psA1gTqAaZDGM%2Fcko8g9TCK1o8O8KDV9XFH%2F%2FneO5VLlR82Z4nIxp7Gadkh%2B9KhCB7sasPw9Mm71qOOAsLtsQzY0LbywStzXipT4NsgzlNhnb1ooWVKEGZNBAbS1qLaxVzhT03wN4pKf4Firrn%2BbbeGGubW%2F5wvm2Zu0gzD%2FfI3s%2FA1gsAyBf3er6JN2M1AattEQsebySOW1h08oZLGeZN%2FuVxl2BCreiF4QfmEdQWStiipxdJ4LmzuM53Lsh2pKDTnJ06PM%2BD1fYRFNW040ylJkyGqrDUgTA%2BSmwn0B%2BraKwOMswwKiwDjfa%2Fa0ab2nO6uL9b0hJu31ILkDD%2FtqZD5o1wby%2BrPpMGlcb4ZcXR83n94Yy8MfHb9ThGtMcg9wzaYzLswiHwgj0Xgyr6pmnCA5TCL7LaPBjqmARZXi%2FE5LncXCt5FLKktPDqeu%2FP5PaM2MEnkOUIaUSu7i46%2BeI63EBFfyHOI9x7J0NrScdjten3QwyHjj9UHUCrI%2Fll9tU6kMGnVsEuVz7mIwNhWth10PGkoTs%2BnrpwnjCmWiEp%2F0c6DmCoW1wCFt5pv4HNcfORqK7HURMLR9WsBg%2BtDsM2pcgsMC8clXsE128tva%2B%2B53G62QbI54Ct9jB5jAu%2FvYZI%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220123T232750Z&X-Amz-SignedHeaders=host&X-Amz-Expires=599&X-Amz-Credential=ASIA2YR6PYW5WJK2DFLD%2F20220123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=6190016703fefce5f0ee082a3c8e2b76e8d55a53e0d72d36a5944a8ee6d0786f"
      />
      <Form
        setFormEntity={setFormEntity}
        formEntity={formEntity}
        handleSubmitEntity={handleSubmitEntity}
        clearLocalstorage={clearLocalstorage}
      />
      <BasicTable rows={state} />
      <br />
      {state.length > 1 && (
        <Relationship
          nodes={state}
          fieldsEgdes={fieldsEgdes}
          setFieldsEgdes={setFieldsEgdes}
          AddEgdes={handleAddEgdes}
        />
      )}
      <RelationTable rows={edges} nodes={state} />

      {nodes.length > 0 && <VisNetwork nodes={nodes} edges={edges} />}
    </>
  );
}

export default App;
