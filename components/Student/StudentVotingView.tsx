import { useState } from 'react';
import { Category, Vote } from '../../types';
import { submitVotes } from '../../services/storageService';

interface StudentVotingViewProps {
  studentName: string;
  categories: Category[];
  onFinish: () => void;
}

export default function StudentVotingView({ studentName, categories, onFinish }: StudentVotingViewProps) {
  const [currentCatIndex, setCurrentCatIndex] = useState(0);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [isDone, setIsDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedNominee, setSelectedNominee] = useState<string>('');

  const category = categories[currentCatIndex];

  const handleSelectNominee = (nomineeId: string) => {
    console.log('Seleccionado:', nomineeId);
    setSelectedNominee(nomineeId);
  };

  const handleConfirmVote = async () => {
    if (!selectedNominee) {
      alert('Por favor selecciona un nominado');
      return;
    }

    const newVote: Vote = {
      studentName,
      categoryId: category.id,
      nomineeId: selectedNominee,
      timestamp: Date.now()
    };

    const updatedVotes = [...votes, newVote];
    setVotes(updatedVotes);

    if (currentCatIndex < categories.length - 1) {
      setSelectedNominee('');
      setCurrentCatIndex(prev => prev + 1);
    } else {
      setIsSubmitting(true);
      try {
        await submitVotes(studentName, updatedVotes);
        setIsDone(true);
      } catch (error) {
        console.error('Error enviando votos:', error);
        alert('Error al enviar los votos. Por favor intenta de nuevo.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentCatIndex > 0) {
      setCurrentCatIndex(prev => prev - 1);
      setSelectedNominee('');
    }
  };

  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-fun-purple text-white text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mb-4"></div>
        <h1 className="text-3xl font-bold">Enviando tus votos...</h1>
        <p className="text-lg mt-2">Por favor espera</p>
      </div>
    );
  }

  if (isDone) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-fun-blue text-white text-center">
        <h1 className="text-4xl font-bold mb-4">¡Votos Enviados! 🎉</h1>
        <p className="text-xl mb-8">Gracias por participar, {studentName}.</p>
        <button onClick={onFinish} className="px-8 py-3 bg-white text-fun-blue rounded-full font-bold shadow-lg hover:bg-gray-100 transition">
          Volver al Inicio
        </button>
      </div>
    );
  }

  if (!category) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen bg-fun-bg p-4 flex flex-col">
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
        <div 
          className="h-full bg-fun-pink rounded-full transition-all duration-300" 
          style={{ width: `${((currentCatIndex) / categories.length) * 100}%` }}
        ></div>
      </div>

      <div className="text-center mb-8">
        <span className="text-6xl mb-4 block">{category.emoji}</span>
        <h2 className="text-2xl font-bold text-fun-purple mb-2 uppercase tracking-wide">{category.title}</h2>
        <p className="text-gray-600 text-lg">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mx-auto mb-8">
        {category.nominees.map(nominee => (
          <button 
            key={nominee.id}
            onClick={() => handleSelectNominee(nominee.id)}
            className={`p-4 rounded-2xl shadow-sm transition transform hover:-translate-y-1 border-2 flex items-center space-x-4 ${
              selectedNominee === nominee.id 
                ? 'bg-fun-yellow text-white border-fun-purple scale-105 shadow-xl' 
                : 'bg-white hover:shadow-xl hover:bg-fun-yellow hover:text-white border-transparent hover:border-white'
            }`}
          >
            <span className="text-3xl">{nominee.avatar || '👤'}</span>
            <span className="text-xl font-bold">{nominee.name}</span>
            {selectedNominee === nominee.id && (
              <span className="ml-auto text-2xl">✓</span>
            )}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto mt-auto space-y-3 pb-8">
        <button 
          onClick={handleConfirmVote}
          disabled={!selectedNominee}
          className={`w-full py-5 rounded-2xl text-xl font-bold shadow-xl transition-all duration-300 ${
            selectedNominee 
              ? 'bg-gradient-to-r from-fun-purple to-fun-pink text-white hover:scale-105 animate-pulse' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {selectedNominee ? '✓ CONFIRMAR MI VOTO' : '👆 Selecciona un nominado primero'}
        </button>
        
        {currentCatIndex > 0 && (
          <button 
            onClick={handleBack}
            className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl text-lg font-semibold hover:bg-gray-300 transition"
          >
            ← Volver a la categoría anterior
          </button>
        )}

        <div className="text-center text-gray-400 text-sm mt-4">
          Categoría {currentCatIndex + 1} de {categories.length}
        </div>
      </div>
    </div>
  );
}