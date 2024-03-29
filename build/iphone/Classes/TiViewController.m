/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2012 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */

#import "TiViewController.h"
#import "TiApp.h"



@implementation TiViewController

-(id)initWithViewProxy:(TiViewProxy<TiUIViewController>*)window_
{
	if (self = [super init])
	{
		proxy = window_;
	}
	return self;
}

-(void)dealloc
{
//    RELEASE_TO_NIL(proxy);
    [super dealloc];
}

-(void)loadView
{
	self.view = [proxy view];
}

@synthesize proxy;

- (BOOL) shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)toInterfaceOrientation
{
	//Since the AppController will be the deciding factor, and it compensates for iPad, let it do the work.
	return [[[TiApp app] controller] shouldAutorotateToInterfaceOrientation:toInterfaceOrientation];
}

- (void)willAnimateRotationToInterfaceOrientation:(UIInterfaceOrientation)toInterfaceOrientation duration:(NSTimeInterval)duration
{
	[super willAnimateRotationToInterfaceOrientation:toInterfaceOrientation duration:duration];
	if ([proxy respondsToSelector:@selector(willAnimateRotationToInterfaceOrientation:duration:)])
	{
		[proxy willAnimateRotationToInterfaceOrientation:toInterfaceOrientation duration:duration];
	}
	[[proxy childViewController] willAnimateRotationToInterfaceOrientation:toInterfaceOrientation duration:duration];
}

- (void)viewWillAppear:(BOOL)animated;    // Called when the view is about to made visible. Default does nothing
{
	if ([proxy respondsToSelector:@selector(viewWillAppear:)])
	{
		[proxy viewWillAppear:animated];
	}
	[[proxy childViewController] viewWillAppear:animated];
	VerboseLog(@"%@:%@%@",self,proxy,CODELOCATION);
}
- (void)viewDidAppear:(BOOL)animated;     // Called when the view has been fully transitioned onto the screen. Default does nothing
{
	if ([proxy respondsToSelector:@selector(viewDidAppear:)])
	{
		[proxy viewDidAppear:animated];
	}
	[[proxy childViewController] viewDidAppear:animated];
	VerboseLog(@"%@:%@%@",self,proxy,CODELOCATION);
}
- (void)viewWillDisappear:(BOOL)animated; // Called when the view is dismissed, covered or otherwise hidden. Default does nothing
{
	if ([proxy respondsToSelector:@selector(viewWillDisappear:)])
	{
		[proxy viewWillDisappear:animated];
	}
	[[proxy childViewController] viewWillDisappear:animated];
	VerboseLog(@"%@:%@%@",self,proxy,CODELOCATION);
}
- (void)viewDidDisappear:(BOOL)animated;  // Called after the view was dismissed, covered or otherwise hidden. Default does nothing
{
	if ([proxy respondsToSelector:@selector(viewDidDisappear:)])
	{
		[proxy viewDidDisappear:animated];
	}
	[[proxy childViewController] viewDidDisappear:animated];

	VerboseLog(@"%@:%@%@",self,proxy,CODELOCATION);
}

@end
