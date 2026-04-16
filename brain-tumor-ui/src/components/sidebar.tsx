import Image from 'next/image';

export const Sidebar = () => {
  return (
    <div className="h-screen hidden lg:block  text-white top-0 sticky">
      <Image src="/logo.svg" alt="logo" height={250} width={250} className="pt-5"/>
      <div className="mb-4 p-6 pl-8">

        <p className="text-sm opacity-80 mb-6">
          Deep learning model trained on MRI scans to detect brain tumors like glioma.
        </p>

        <div className="space-y-3 text-sm">
          <p>⚡ Model: YOLOv8 Custom</p>
          <p>📊 Input: MRI Images</p>
          <p>🚀 Status: Active</p>
        </div>

        <div className="mt-10 p-4 w-fit bg-white/10 rounded-xl text-xs opacity-80">
          Educational AI diagnostic demo system
        </div>
      </div>
    </div>
  );
}