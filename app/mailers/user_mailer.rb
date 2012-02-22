class UserMailer < ActionMailer::Base
	default :from => '9@3dpeterburg.ru'
	
	def registration_confirmation(user)
		mail(:to => user.email, :subject => 'Registered!')
	end
end
