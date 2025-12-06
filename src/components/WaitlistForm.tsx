import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  tradingApproach: z.string().min(1, "Please select an option"),
  tradingDuration: z.string().min(1, "Please select an option"),
  trackingMethod: z.string().min(1, "Please select an option"),
  reviewFrequency: z.string().min(1, "Please select an option"),
  mainLimit: z.string().min(1, "Please select an option"),
  improvementArea: z.string().min(1, "Please select an option"),
  decisionStyle: z.string().min(1, "Please select an option"),
  learningStyle: z.string().min(1, "Please select an option"),
  trackingValue: z.string().min(1, "Please select an option"),
  upgradeIntent: z.string().min(1, "Please select an option"),
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  socialHandle: z.string().max(100).optional(),
  peakPerformance: z.string().trim().min(10, "Please describe your vision").max(500),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  {
    title: "Contact Information",
    fields: ["fullName", "email", "socialHandle", "peakPerformance"],
  },
  {
    title: "Identity & Context",
    fields: ["tradingApproach", "tradingDuration"],
  },
  {
    title: "Process Self-Assessment",
    fields: ["trackingMethod", "reviewFrequency"],
  },
  {
    title: "Cognitive Pain Points",
    fields: ["mainLimit", "improvementArea"],
  },
  {
    title: "Decision Behavior Profile",
    fields: ["decisionStyle", "learningStyle"],
  },
  {
    title: "Value Perception",
    fields: ["trackingValue", "upgradeIntent"],
  },
];

export const WaitlistForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      tradingApproach: "",
      tradingDuration: "",
      trackingMethod: "",
      reviewFrequency: "",
      mainLimit: "",
      improvementArea: "",
      decisionStyle: "",
      learningStyle: "",
      trackingValue: "",
      upgradeIntent: "",
      fullName: "",
      email: "",
      socialHandle: "",
      peakPerformance: "",
    },
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  const validateCurrentStep = async () => {
    const fields = steps[currentStep].fields as Array<keyof FormData>;
    const isValid = await form.trigger(fields);
    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "landing_page" }),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        const message = result?.error || "Something went wrong";
        throw new Error(message);
      }

      setIsComplete(true);
      form.reset();
      toast({
        title: "Registration Complete",
        description: "You're now part of Greenridge Studios' early access network.",
      });
    } catch (err: any) {
      const message = err?.message || "Failed to join waitlist";
      setSubmitError(message);
      toast({
        title: "Submission failed",
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto text-center animate-fade-in">
        <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          You're now part of Greenridge Studios' early access network.
        </h3>
        <p className="text-lg text-muted-foreground mb-8">
          Expect structured insights and behavioral tools designed to make performance measurable.
        </p>
        <p className="text-sm text-muted-foreground">
          We'll only send research updates and product releases. No marketing noise.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8">
        <Progress value={progress} className="h-2" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Step 1: Contact Information */}
          {currentStep === 0 && (
            <div className="space-y-6 animate-fade-in">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socialHandle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">X or Discord Handle (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="@username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="peakPerformance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">What are you hoping to achieve with us?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your vision for peak performance..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 2: Identity & Context */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <FormField
                control={form.control}
                name="tradingApproach"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">What best describes your trading approach?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
                        {["Day Trading", "Swing Trading", "Scalping", "Other", "Not sure"].map((option) => (
                          <div key={option} className="flex items-center space-x-3">
                            <RadioGroupItem value={option} id={`approach-${option}`} />
                            <Label htmlFor={`approach-${option}`} className="cursor-pointer">{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tradingDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">How long have you been trading?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
                        {["<1 year", "1–3 years", "3–5 years", "5+ years", "I'm completely new to it"].map((option) => (
                          <div key={option} className="flex items-center space-x-3">
                            <RadioGroupItem value={option} id={`duration-${option}`} />
                            <Label htmlFor={`duration-${option}`} className="cursor-pointer">{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 3: Process Self-Assessment */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <FormField
                control={form.control}
                name="trackingMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">How do you currently track performance?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
                        {["Not tracking", "Manual journal", "Spreadsheet", "Notion", "Software"].map((option) => (
                          <div key={option} className="flex items-center space-x-3">
                            <RadioGroupItem value={option} id={`tracking-${option}`} />
                            <Label htmlFor={`tracking-${option}`} className="cursor-pointer">{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reviewFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">How often do you review past trades?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
                        {["Daily", "Weekly", "Monthly", "Rarely"].map((option) => (
                          <div key={option} className="flex items-center space-x-3">
                            <RadioGroupItem value={option} id={`review-${option}`} />
                            <Label htmlFor={`review-${option}`} className="cursor-pointer">{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 4: Cognitive Pain Points */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <FormField
                control={form.control}
                name="mainLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">What most limits your consistency?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
                        {["Emotional decision-making", "Lack of structure", "Overtrading", "Discipline fatigue"].map((option) => (
                          <div key={option} className="flex items-center space-x-3">
                            <RadioGroupItem value={option} id={`limit-${option}`} />
                            <Label htmlFor={`limit-${option}`} className="cursor-pointer">{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="improvementArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Which area would you most want to improve?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
                        {["Emotional control", "Routine", "Risk calibration", "Feedback structure"].map((option) => (
                          <div key={option} className="flex items-center space-x-3">
                            <RadioGroupItem value={option} id={`improve-${option}`} />
                            <Label htmlFor={`improve-${option}`} className="cursor-pointer">{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 5: Decision Behavior Profile */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <FormField
                control={form.control}
                name="decisionStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">How do you make trading decisions under pressure?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
                        {["Impulse", "Intuition", "Rule-based", "Structured system"].map((option) => (
                          <div key={option} className="flex items-center space-x-3">
                            <RadioGroupItem value={option} id={`decision-${option}`} />
                            <Label htmlFor={`decision-${option}`} className="cursor-pointer">{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="learningStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">How do you prefer to learn and improve?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
                        {["Independent practice", "Structured frameworks", "Mentorship", "Data-driven feedback"].map((option) => (
                          <div key={option} className="flex items-center space-x-3">
                            <RadioGroupItem value={option} id={`learning-${option}`} />
                            <Label htmlFor={`learning-${option}`} className="cursor-pointer">{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 6: Value Perception */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fade-in">
              <FormField
                control={form.control}
                name="trackingValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">How valuable would structured performance tracking be for you?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
                        {["Not valuable", "Somewhat", "Very", "Essential"].map((option) => (
                          <div key={option} className="flex items-center space-x-3">
                            <RadioGroupItem value={option} id={`value-${option}`} />
                            <Label htmlFor={`value-${option}`} className="cursor-pointer">{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="upgradeIntent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">How likely are you to upgrade for advanced behavioral analytics later?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
                        {["Not likely", "Maybe", "Likely", "Definitely"].map((option) => (
                          <div key={option} className="flex items-center space-x-3">
                            <RadioGroupItem value={option} id={`upgrade-${option}`} />
                            <Label htmlFor={`upgrade-${option}`} className="cursor-pointer">{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}


          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t border-border">
            <Button
              type="button"
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2" />
              Previous
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={handleNext}>
                Next
                <ArrowRight className="ml-2" />
              </Button>
            ) : (
              <Button type="submit">
                  Join Now
                  <ArrowRight className="ml-2" />
                </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
