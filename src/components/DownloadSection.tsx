import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { TestTube } from "lucide-react";

function DownloadSection() {
  const [accepted, setAccepted] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Join the eNuts alpha test</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex items-start gap-2">
          <Checkbox
            onCheckedChange={setAccepted}
            id="accept-terms"
            className="mt-1 cursor-pointer"
          />
          <Label
            htmlFor="accept-terms"
            className="leading-relaxed cursor-pointer"
          >
            I acknowledge that eNuts is alpha software and I will be using it at
            my own risk
          </Label>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full"
          disabled={!accepted}
          onClick={() =>
            window.open("https://testflight.apple.com/join/tuY72JE3", "_blank")
          }
        >
          <TestTube />
          Join the TestFlight
        </Button>
        {/* <Button */}
        {/*   className="w-full" */}
        {/*   disabled={!accepted} */}
        {/*   onClick={() => */}
        {/*     window.open("https://github.com/cashubtc/eNuts", "_blank") */}
        {/*   } */}
        {/* > */}
        {/*   <Download /> */}
        {/*   Get the APK */}
        {/* </Button> */}
      </CardFooter>
    </Card>
  );
}

export default DownloadSection;
