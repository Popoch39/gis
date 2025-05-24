import * as React from 'react';
import { Row, Column, Button, Text, Html, Tailwind } from "@react-email/components";

interface VerifyEmailProps {
firstName: string;
url: string;
}

const VerifyEmail = ({ firstName, url }: VerifyEmailProps) => {
return (
<Html>
<Tailwind>
  <Text className="font-semibold font-sans text-[24px] text-indigo-400 leading-[32px]">
    Bonjour {firstName},
  </Text>
  <Text className="font-sans text-[16px] text-gray-600 leading-[24px]">
    Cliquez sur le bouton ci-dessous pour vérifier votre adresse email
  </Text>
  <Row>
    <Column align="center">
      <Row>
        <td align="center" className="w-1/2 pr-[16px]" colSpan={1}>
          <Button
            className="box-border rounded-[8px] bg-indigo-600 font-sans hover:bg-indigo-700 px-[20px] py-[12px] text-center font-semibold text-white"
            href={url}>
            Vérifier mon adresse email
          </Button>
        </td>
      </Row>
    </Column>
  </Row>
</Tailwind>

</Html>
)
}

VerifyEmail.previewProps = {
firstName: "John",
url: "https://example.com"
}

export default VerifyEmail;
