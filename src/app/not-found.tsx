import Button from "@/components/common/Button";
import Container from "@/components/layout/Container";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";
import { IoGameControllerOutline, IoHomeOutline } from "react-icons/io5";

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center py-16">
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-accent opacity-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            404
          </div>
          <div className="relative z-10">
            <IoGameControllerOutline className="w-24 h-24 mx-auto text-accent mb-4" />
            <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
          </div>
        </div>

        <p className="text-gray-400 max-w-lg mb-8">
          Sorry, we could not find the page you are looking for. It might have
          been moved, deleted, or perhaps never existed in the first place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            size="lg"
            href={ROUTES.HOME}
            leftIcon={<IoHomeOutline />}
          >
            Go Home
          </Button>

          <Button
            variant="primary"
            size="lg"
            href={ROUTES.GAMES}
            leftIcon={<IoGameControllerOutline />}
          >
            Browse Games
          </Button>
        </div>

        <div className="mt-12">
          <p className="text-sm text-gray-500">
            If you believe this is an error, please{" "}
            <Link href="/contact" className="text-accent hover:underline">
              contact support
            </Link>
            .
          </p>
        </div>
      </div>
    </Container>
  );
}
