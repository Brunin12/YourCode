"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { toast } from "sonner";
import { createStartup } from "@/lib/actions";
import { useRouter } from 'next/navigation'

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    category: "",
    link: "",
    pitch: "",
  });

  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: any) => {
    try {
      const values = {
        title: formData.get("title") || formValues.title,
        description: formData.get("description") || formValues.description,
        category: formData.get("category") || formValues.category,
        link: formData.get("link") || formValues.link,
        pitch: formValues.pitch,
      };

      await formSchema.parseAsync(values);

      const result = await createStartup(prevState, values, values.pitch);

      if (result.status == "SUCCESS") {
        toast.success("Sucesso!", {
          description: "Sua proposta de startup foi publicada.",
        });
      }


      router.push(`/startup/${result._id}`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        toast.error("Erro", {
          description: "Por favor verifique os campos e tente novamente.",
        });

        return { ...prevState, error: "Falha na Validação", status: "ERROR" };
      }

      toast.error("Erro", {
        description: "Um erro inesperado aconteceu, tente novamente.",
      });


      return {
        ...prevState,
        error: "Erro inesperado ocorreu",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Titulo
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input capitalize"
          placeholder="Título da Startup"
          required
          value={formValues.title}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Descrição
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          placeholder="Descrição da Startup"
          required
          value={formValues.description}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Categoria
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input capitalize"
          placeholder="Categoria da Startup  (Tecnologia, Educação, etc.)"
          required
          value={formValues.category}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, category: e.target.value }))
          }
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          Link para imagem
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          placeholder="Link da Imagem"
          required
          value={formValues.link}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, link: e.target.value }))
          }
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Proposta
        </label>
        <MDEditor
          value={formValues.pitch}
          onChange={(value) =>
            setFormValues((prev) => ({ ...prev, pitch: value || "" }))
          }
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 5, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Descreva brevemente sua proposta e o problema que ela resolve",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Enviando..." : "Envie sua Startup"}
        <Send className="size-6 ml-1" />
      </Button>
    </form>
  );
};

export default StartupForm;
