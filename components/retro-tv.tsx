import type React from "react"

interface RetroTVProps {
  children: React.ReactNode
  className?: string
}


export function RetroTV({ children, className = "" }: RetroTVProps) {
  return (
    <div className={`relative ${className}`}>
      {/* TV Frame */}
      <div className="relative aspect-[4/3] bg-gray-900 rounded-lg overflow-hidden border-8 border-gray-800 shadow-2xl tv-shadow">
        {/* TV Screen */}
        <div className="absolute inset-0 bg-black rounded-sm overflow-hidden">
          {/* Screen Content */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 to-transparent">
            {/* Screen Glare */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-30"></div>

            {/* Screen Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,_rgba(0,0,0,0.1)_50%,_transparent_100%)] bg-[length:100%_4px]"></div>

            {/* Screen Content */}
            <div className="absolute inset-0 p-4 overflow-hidden">{children}</div>

            {/* Screen Reflection */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cyan-900/10 pointer-events-none"></div>

            {/* Screen Dust */}
            <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>

            {/* Screen Flicker */}
            <div className="absolute inset-0 opacity-20 screen-flicker pointer-events-none"></div>
          </div>
        </div>

        {/* TV Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0)_100%)] bg-[length:100%_3px] pointer-events-none"></div>

        {/* TV Glow */}
        <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,255,255,0.3)] rounded-sm pointer-events-none tv-glow"></div>

        {/* TV Bezel Reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-30 pointer-events-none"></div>

        {/* TV Screen Edge Vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] rounded-sm pointer-events-none"></div>
      </div>

      {/* TV Stand */}
      <div className="absolute bottom-0 left-1/2 transform translate-x-[-50%] translate-y-[95%] w-[4%] h-[10%] bg-gray-800 rounded-b-lg shadow-md"></div>
      <div className="absolute bottom-0 left-1/2 transform translate-x-[-50%] translate-y-[190%] w-[40%] h-[5%] bg-gray-800 rounded-b-lg shadow-md"></div>

      {/* TV Controls */}
      {/* <div className="absolute right-[-5%] top-[20%] bottom-[20%] w-[8%] bg-gray-800 rounded-r-lg flex flex-col justify-center items-center gap-4 shadow-md">
        <div className="w-[70%] aspect-square rounded-full bg-gray-700 border-2 border-gray-600 shadow-inner"></div>
        <div className="w-[70%] aspect-square rounded-full bg-gray-700 border-2 border-gray-600 shadow-inner"></div>
        <div className="w-[70%] aspect-square rounded-full bg-gray-700 border-2 border-gray-600 shadow-inner"></div>
      </div> */}

      {/* TV Label */}
      {/* <div className="absolute top-[-5%] left-[10%] right-[10%] h-[5%] bg-gray-800 rounded-t-lg flex justify-center items-center shadow-md">
        <div className="text-xs text-cyan-400 font-mono tracking-widest">DEV_TERMINAL</div>
      </div> */}

      {/* TV Power Button */}
      {/* <div className="absolute bottom-[5%] right-[10%] w-[5%] aspect-square">
        <div className="w-full h-full rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center shadow-md">
          <div className="w-[50%] h-[50%] rounded-full bg-red-600 shadow-[0_0_5px_rgba(255,0,0,0.5)]"></div>
        </div>
      </div> */}

      {/* TV Speaker Grills */}
      {/* <div className="absolute left-[5%] top-[30%] bottom-[30%] w-[3%]">
        <div className="h-full w-full bg-gray-800 rounded-l-lg flex flex-col gap-1 p-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-gray-900 h-full rounded-full"></div>
          ))}
        </div>
      </div> */}
    </div>
  )
}