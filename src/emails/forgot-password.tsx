import * as React from 'react';
import { Row, Column, Button, Text, Html, Tailwind } from "@react-email/components";

interface ForgotPasswordProps {
firstName: string;
url: string;
}

const ForgotPasswordEmail = ({ firstName, url }: ForgotPasswordProps) => {
return (
<Html>
<Tailwind>
  <Text className="font-semibold font-sans text-[24px] text-indigo-400 leading-[32px]">
    Bonjour {firstName},
  </Text>
  <Text className="font-sans text-[16px] text-gray-600 leading-[24px]">
    Cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe
  </Text>
  <Row>
    <Column align="center">
      <Row>
        <td align="center" className="w-1/2 pr-[16px]" colSpan={1}>
          <Button
            className="box-border rounded-[8px] bg-indigo-600 font-sans hover:bg-indigo-700 px-[20px] py-[12px] text-center font-semibold text-white"
            href={url}>
            Réinitialiser mon mot de passe
          </Button>
        </td>
      </Row>
    </Column>
  </Row>
</Tailwind>

</Html>
)
}

ForgotPasswordEmail.previewProps = {
firstName: "John",
url: "https://example.com"
}

export default ForgotPasswordEmail;
