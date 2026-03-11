'use client'
import { Dialog, DialogContent } from 'liquidcn/client'
import 'liquidcn/styles.css'

interface QrhhtModalProps {
  open: boolean
  onClose: () => void
}

export default function QrhhtModal({ open, onClose }: QrhhtModalProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <DialogContent
        showCloseButton={true}
        className="!max-w-3xl !max-h-[90vh] !w-[90vw] p-0 overflow-hidden"
      >
        <iframe
          src="https://api.leadconnectorhq.com/widget/booking/lr71aBQG2hC18WSSj6Hd"
          style={{ width: '100%', height: '75vh', minHeight: '500px', border: 'none', display: 'block' }}
          title="Book a Session"
        />
      </DialogContent>
    </Dialog>
  )
}
