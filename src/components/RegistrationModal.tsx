
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface RegistrationModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function RegistrationModal({ isOpen, onOpenChange }: RegistrationModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl h-[90vh] p-0 bg-[#FFF8DC]">
                <DialogTitle className="sr-only">
                    Event Registration
                </DialogTitle>
                <div className="flex-1 w-full h-full overflow-hidden bg-[#FFF8DC]">
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSdRdX19XoYFkuJq3yklwYireMzul6zZyRIF-oKlFEWxf3BG7A/viewform?embedded=true"
                        className="w-full h-full border-0"
                        title="Registration Form"
                    >
                        Loading...
                    </iframe>
                </div>
            </DialogContent>
        </Dialog>
    );
}
