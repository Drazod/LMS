import { H1, H4, P } from "@/components/ui/typography"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  PhoneIcon,
  EnvelopeIcon,
} from "@phosphor-icons/react/dist/ssr"

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, "Tên phải có ít nhất 2 ký tự.")
    .max(32, "Tên phải có tối đa 32 ký tự."),
  lastName: z
    .string()
    .min(2, "Họ và tên đệm phải có ít nhất 2 ký tự.")
    .max(32, "Họ và tên đệm phải có tối đa 32 ký tự."),
  email: z
    .email("Vui lòng nhập địa chỉ email hợp lệ."),
  description: z
    .string()
    .min(10, "Mô tả phải có ít nhất 10 ký tự.")
    .max(500, "Mô tả phải có tối đa 200 ký tự."),
})

export default function SupportPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      description: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Support form data:", data)
    toast.promise<{ name: string }>(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ name: data.firstName }), 2000)
        ),
      {
        loading: "Đang gửi...",
        success: (data) => `Cảm ơn ${data.name} đã liên hệ với chúng tôi! Đội ngũ hỗ trợ sẽ phản hồi bạn sớm nhất có thể.`,
        error: "Error",
      }
    )
  }

  return (
    <div className="w-full">
      <div className="w-full bg-[url(src/assets/home/teacher-help.jpeg)] bg-center bg-no-repeat bg-cover h-96 relative">
        <div className="h-full pt-32 bg-purple-900 opacity-80 text-center flex items-center">
          <p className="text-white m-auto font-bold text-7xl">Hỗ trợ</p>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-2 gap-14 p-14">
        <div className="flex items-center justify-center">
          <div className="flex flex-col gap-10 w-fit">
            <H1>Liên hệ hỗ trợ</H1>
            <div className="flex flex-col gap-4">
              <Card className="gap-2 border-none w-md">
                <CardHeader className="gap-1">
                  <CardTitle className="text-xl">Gọi đội ngũ hỗ trợ</CardTitle>
                  <CardDescription>
                    Thứ 2 - Thứ 6, 8:00 - 17:00
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="!px-0 !gap-0">
                    <PhoneIcon className="!size-6" weight="duotone" />
                    <span className="ml-2 text-base font-medium">
                      <a href="tel:19000000">1900 0000</a>
                    </span>
                  </Button>
                </CardContent>
              </Card>
              <Card className="gap-2 border-none w-md">
                <CardHeader className="gap-1">
                  <CardTitle className="text-xl">Gửi email đến đội ngũ hỗ trợ</CardTitle>
                  <CardDescription>
                    Thứ 2 - Thứ 6, 8:00 - 17:00
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="!px-0 !gap-0">
                    <EnvelopeIcon className="!size-6" weight="duotone" />
                    <span className="ml-2 text-base font-medium">
                      <a href="mailto:support@hoctiengviet.ai">support@hoctiengviet.ai</a>
                    </span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border px-10 py-10">
          <H4>Bạn đang gặp vấn đề? Học tiếng Việt.AI có thể giúp bạn!</H4>
          <P className="leading-snug">
            Đội ngũ hỗ trợ thân thiện của chúng tôi luôn sẵn sàng giúp bạn
            giải quyết mọi vấn đề bạn có thể gặp phải với hệ thống.
          </P>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
            <FieldGroup className="grid grid-cols-2 gap-4">
              <Controller
                name="lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor="form-rhf-input-lastName">
                      Họ và tên đệm
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-lastName"
                      aria-invalid={fieldState.invalid}
                      placeholder="Nhập họ và tên đệm"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor="form-rhf-input-firstName">
                      Tên
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-firstName"
                      aria-invalid={fieldState.invalid}
                      placeholder="Nhập tên"
                      autoComplete="given-name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup className="flex flex-col gap-4">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor="form-rhf-input-email">
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Nhập email"
                      autoComplete="email"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor="form-rhf-demo-description">
                      Mô tả vấn đề của bạn
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="form-rhf-demo-description"
                        placeholder="Mô tả chi tiết vấn đề bạn đang gặp phải..."
                        rows={6}
                        className="min-h-24 resize-none"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.value.length}/200 ký tự
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription>
                      Vui lòng cung cấp càng nhiều chi tiết càng tốt để
                      chúng tôi có thể hỗ trợ bạn hiệu quả hơn.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Button type="submit" className="mt-4">Gửi</Button>
          </form>
        </div>
      </div>
    </div>
  )
}