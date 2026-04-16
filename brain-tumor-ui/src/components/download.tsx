"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { downloadImage } from "@/lib/download-image"
import { downloadPDF } from "@/lib/download-pdf"
import { PredictionResponse } from "@/types/predictions"
import { Download } from "lucide-react"

type Props = {
  result: PredictionResponse | null;
};
export function DownloadReport( { result } : Props) {
  return (
    <DropdownMenu >
      <DropdownMenuTrigger className="bg-white border border-white/10 p-3 text-black" render={<Button variant="outline" className= "h-10"><Download /></Button>} />
      <DropdownMenuContent className="bg-zinc-900 ring-0 border border-white/10 w-60 space-y-2">
        <DropdownMenuItem >
          <button onClick={downloadPDF} className="w-full flex justify-center bg-transparent text-white border border-white/30 rounded-xl py-2 text-sm hover:bg-zinc-800 transition">
            <div className="flex gap-3 ml-4 w-full">
                <p>Download Report (PDF)</p>
                <Download size={20}/>
            </div>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button onClick={() => result && downloadImage(result.output_image_url)} className="w-full flex justify-center bg-transparent text-white border border-white/30 rounded-xl py-2 text-sm hover:bg-zinc-800 transition">
            <div className="flex gap-3 ml-4 w-full">
                <p>Download Image</p>
                <Download size={20}/>
            </div>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
