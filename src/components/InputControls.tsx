import {
  IonCol,
  IonLabel,
  IonRow,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import React from "react";

const InputControls: React.FC<{
  selectedValue: "m/kg" | "ft/lbs";
  onSelectedValue: (value: "m/kg" | "ft/lbs") => void;
}> = (props) => {
  const handleChange = (e: CustomEvent) => {
    props.onSelectedValue(e.detail.value);
  };

  return (
    <IonRow>
      <IonCol>
        <IonSegment value={props.selectedValue} onIonChange={handleChange}>
          <IonSegmentButton value="m/kg">
            <IonLabel>m/kg</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="ft/lbs">
            <IonLabel>ft/lbs</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonCol>
    </IonRow>
  );
};
export default InputControls;
