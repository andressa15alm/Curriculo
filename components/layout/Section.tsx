import { ReactNode } from "react";
export default function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
    return (
        <section id={id} className={`mx-auto max-w-5xl px-5 py-24 ${className}`}>
            {children}
        </section>
    );
}  