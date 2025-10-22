
import { useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileTextIcon, 
  MinusCircleIcon, 
  PlusCircleIcon, 
  FloppyDiskIcon,
  ImageIcon,
  VideoIcon
} from "@phosphor-icons/react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Loader2 } from "lucide-react";

export function AddSession({ name, setFunc, index, courseId }: {
  name: string;
  setFunc: (updater: ((prev: any[]) => any[]) | any[]) => void;
  index: number;
  courseId: number;
}) {
  const [formData, setFormData] = useState({
    courseId: courseId.toString(),
    sectionName: name,
    title: '',
    description: '',
    sessionType: 'LISTEN'
  });

  const [textContents, setTextContents] = useState([
    { contentType: 'TEXT', content: '' }
  ]);

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const handleFormDataChange = (field: string, value: string) => {
    console.log('Form data change:', field, value); // Debug log
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTextContentChange = (index: number, field: string, value: string) => {
    const newContents = [...textContents];
    newContents[index] = { ...newContents[index], [field]: value };
    setTextContents(newContents);
  };

  const addTextContent = () => {
    setTextContents(prev => [...prev, { contentType: 'TEXT', content: '' }]);
  };

  const removeTextContent = (index: number) => {
    if (textContents.length > 1) {
      setTextContents(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleImageFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleVideoFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideoFiles(Array.from(e.target.files));
    }
  };

  // File upload components
  const ImageUpload = () => (
    <div className="space-y-2">
      <label className="flex items-center gap-2 cursor-pointer hover:bg-accent rounded-lg p-2 transition-colors">
        <Tooltip>
          <TooltipTrigger asChild>
            <ImageIcon size={20} className="text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Upload images</p>
          </TooltipContent>
        </Tooltip>
        <input 
          type="file" 
          multiple
          accept="image/*"
          onChange={handleImageFiles} 
          className="hidden" 
        />
        <span className="text-sm font-medium">Choose Images ({imageFiles.length} selected)</span>
      </label>
    </div>
  );

  const VideoUpload = () => (
    <div className="space-y-2">
      <label className="flex items-center gap-2 cursor-pointer hover:bg-accent rounded-lg p-2 transition-colors">
        <Tooltip>
          <TooltipTrigger asChild>
            <VideoIcon size={20} className="text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Upload videos</p>
          </TooltipContent>
        </Tooltip>
        <input 
          type="file" 
          multiple
          accept="video/*"
          onChange={handleVideoFiles} 
          className="hidden" 
        />
        <span className="text-sm font-medium">Choose Videos ({videoFiles.length} selected)</span>
      </label>
    </div>
  );

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const data = new FormData();
      
      // Append basic fields
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key as keyof typeof formData]);
      });
      
      // Append text contents
      data.append('textContents', JSON.stringify(textContents));
      
      // Append files
      imageFiles.forEach(file => data.append('imageFiles', file));
      videoFiles.forEach(file => data.append('videoFiles', file));
      
      // File positions (place files after each text content)
      const filePositions: number[] = [];
      let currentPos = 1;
      
      // Add positions for images
      imageFiles.forEach(() => {
        currentPos++;
        filePositions.push(currentPos);
      });
      
      // Add positions for videos
      videoFiles.forEach(() => {
        currentPos++;
        filePositions.push(currentPos);
      });
      
      data.append('filePositions', JSON.stringify(filePositions));

      const response = await api.post(`/courses/${courseId}/sections`, data);
      console.log('Session created:', response.data);
      
      // Reset form and close dialog
      setFunc((prev: any[]) => {
        const updatedFunc = [...prev];
        updatedFunc.map((i) => {
          if (i.id === index) {
            i.name = formData.sectionName;
            i.description = formData.description;
          }
        });
        return updatedFunc;
      });
      
      // Reset form
      setFormData({
        courseId: courseId.toString(),
        sectionName: '',
        title: '',
        description: '',
        sessionType: 'LISTEN'
      });
      setTextContents([{ contentType: 'TEXT', content: '' }]);
      setImageFiles([]);
      setVideoFiles([]);
      
    } catch (error: any) {
      console.error('Error creating session:', error.response?.data || error.message);
    } finally {
      setIsSaving(false);
    }
  };





  return (
    <TooltipProvider>
      <div className="p-4">
        <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileTextIcon size={24} className="text-primary" />
            Create New Session
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Section Name</label>
              <Input
                value={formData.sectionName}
                onChange={(e) => handleFormDataChange('sectionName', e.target.value)}
                placeholder="Enter section name"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => handleFormDataChange('title', e.target.value)}
                placeholder="Enter session title"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleFormDataChange('description', e.target.value)}
              placeholder="Describe this session..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Session Type</label>
            <Select value={formData.sessionType} onValueChange={(value) => handleFormDataChange('sessionType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select session type" />
              </SelectTrigger>
              <SelectContent className="z-[9999]">
                <SelectItem value="LISTEN">Listen</SelectItem>
                <SelectItem value="READING">Reading</SelectItem>
                <SelectItem value="SPEAKING">Speaking</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Text Contents */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Text Contents</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={addTextContent}
                    className="h-8 w-8 p-0"
                  >
                    <PlusCircleIcon size={16} className="text-primary" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add text content</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            {textContents.map((content, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-4 border space-y-3">
                <div className="flex items-center gap-2">
                  <Select 
                    value={content.contentType} 
                    onValueChange={(value) => handleTextContentChange(index, 'contentType', value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[9999]">
                      <SelectItem value="TEXT">Text</SelectItem>
                      <SelectItem value="DOCUMENT">Document</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {textContents.length > 1 && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTextContent(index)}
                          className="h-8 w-8 p-0"
                        >
                          <MinusCircleIcon size={16} className="text-destructive" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Remove content</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
                
                <Textarea
                  value={content.content}
                  onChange={(e) => handleTextContentChange(index, 'content', e.target.value)}
                  placeholder="Enter text content"
                  rows={3}
                />
              </div>
            ))}
          </div>

          {/* File Uploads */}
          <div className="space-y-4">
            <span className="text-sm font-medium">File Uploads</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/30 rounded-lg p-4 border">
                <ImageUpload />
              </div>
              <div className="bg-muted/30 rounded-lg p-4 border">
                <VideoUpload />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2">
              {isSaving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <FloppyDiskIcon size={16} />
              )}
              {isSaving ? "Creating Session..." : "Create Session"}
            </Button>
          </div>
        </CardContent>
      </Card>
      </div>
    </TooltipProvider>
  );
}
