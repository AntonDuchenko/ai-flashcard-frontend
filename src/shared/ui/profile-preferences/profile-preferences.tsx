import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Button } from '../button';
import { Checkbox } from '../checkbox';
import { Label } from '../label';
import { useInterests } from '@/shared/lib/hooks/useInterests';
import { useCompleteProfile } from '@/shared/lib/hooks/useCompleteProfile';
import { useNavigate } from 'react-router';

const ENGLISH_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

type Interest = { id: string; name: string };

export function ProfilePreferences() {
  const [englishLevel, setEnglishLevel] = useState<string>('');
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);
  const [errors, setErrors] = useState<{ englishLevel?: string; interests?: string }>({});
  const navigate = useNavigate();

  const { data: interests } = useInterests();
  const { mutate } = useCompleteProfile();

  const toggleInterest = (interest: Interest) => {
    setSelectedInterests((prev) =>
      prev.some((i) => i.id === interest.id)
        ? prev.filter((i) => i.id !== interest.id)
        : [...prev, interest],
    );
  };

  const handleSubmit = () => {
    const newErrors: typeof errors = {};

    if (!englishLevel) {
      newErrors.englishLevel = 'English level is required';
    }
    if (selectedInterests.length === 0) {
      newErrors.interests = 'Please select at least one interest';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      mutate(
        { englishLvl: englishLevel, interests: selectedInterests },
        {
          onSuccess: () => {
            setEnglishLevel('');
            setSelectedInterests([]);
            navigate('/');
          },
        },
      );
      console.log('Submit:', { englishLevel, selectedInterests });
    }
  };

  return (
    <div className="max-w-md w-full mx-auto space-y-6 p-4 border rounded-2xl shadow-md bg-white dark:bg-zinc-900">
      <div className="space-y-2">
        <Label>English Level</Label>
        <Select value={englishLevel} onValueChange={setEnglishLevel}>
          <SelectTrigger>
            <SelectValue placeholder="Select your level" />
          </SelectTrigger>
          <SelectContent>
            {ENGLISH_LEVELS.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.englishLevel && <p className="text-sm text-red-500 mt-1">{errors.englishLevel}</p>}
      </div>

      <div className="space-y-2">
        <Label>Interests</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start overflow-hidden">
              {selectedInterests.length > 0
                ? selectedInterests.map((i) => i.name).join(', ')
                : 'Select interests'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="max-h-[30vh] overflow-auto" align="start">
            <div className="flex flex-col space-y-2">
              {interests &&
                interests.map((interest: Interest) => {
                  const isChecked = selectedInterests.some((i) => i.id === interest.id);
                  return (
                    <Label key={interest.id} className="flex items-center space-x-2">
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => toggleInterest(interest)}
                        id={interest.name}
                      />
                      <span className="text-sm">{interest.name}</span>
                    </Label>
                  );
                })}
            </div>
          </PopoverContent>
        </Popover>
        {errors.interests && <p className="text-sm text-red-500 mt-1">{errors.interests}</p>}
      </div>

      <Button className="w-full" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}
