import React from "react";
import { ServiceConsumer } from "../../service/service-context";

export const withService = (Wrapped, mapMethodsToProps) => {
  return props => {
    return (
      <ServiceConsumer>
        {musicService => {
          const serviceProps = mapMethodsToProps(musicService);
          return <Wrapped {...props} {...serviceProps} />;
        }}
      </ServiceConsumer>
    );
  };
};
