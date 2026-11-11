"use client";

import { Button, Icon } from "@/components/ui";

export default function PrintButton() {
  return (
    <Button
      variant="primary"
      className="!px-5 !py-2"
      icon={<Icon name="download" size={16} />}
      onClick={() => window.print()}
    >
      Download PDF
    </Button>
  );
}
