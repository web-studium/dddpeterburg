ActionMailer::Base.smtp_settings = {
  :address              => "smtp.gmail.com",
  :port                 => 587,
  :domain               => "3dpeterburg.ru",
  :user_name            => "9@3dpeterburg.ru",
  :password             => "3Waa0a01aTbarantrg",
  :authentication       => "plain",
  :enable_starttls_auto => true
}

ActionMailer::Base.default_url_options[:host] = "localhost:3000"